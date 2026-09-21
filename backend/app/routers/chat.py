"""
Chat & Voice Assistant Endpoints.
Handles unified incoming messages, voice audio uploads, STT transcription, and agent responses.
"""

import base64
from typing import Optional
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from app.services.sarvam_service import transcribe_audio_sarvam
from app.services.azure_speech_service import transcribe_audio_azure
from app.services.agent_service import process_user_query

router = APIRouter(prefix="/api/chat", tags=["Chat & Voice Assistant"])

class TextQueryRequest(BaseModel):
    query: str
    language_code: Optional[str] = "hi-IN"
    user_role: Optional[str] = "student"
    generate_audio: Optional[bool] = True
    provider: Optional[str] = "sarvam"

@router.post("/message")
async def chat_message_endpoint(req: TextQueryRequest):
    """
    Main text query endpoint.
    Processes query -> Guardrail -> Tools/RAG -> Multilingual TTS.
    """
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query text cannot be empty.")
        
    result = await process_user_query(
        query_text=req.query,
        language_code=req.language_code or "hi-IN",
        user_role=req.user_role or "student",
        generate_audio=req.generate_audio if req.generate_audio is not None else True,
        provider=req.provider or "sarvam"
    )
    return result

SILENT_SPEECH_MESSAGES = {
    "hi-IN": "माफ़ कीजिए, आपकी आवाज़ स्पष्ट रूप से सुनाई नहीं दी। कृपया माइक बटन दबाकर दोबारा बोलें।",
    "en-IN": "Sorry, I couldn't hear your voice clearly. Please tap the microphone and speak again.",
    "ta-IN": "மன்னிக்கவும், உங்கள் குரல் தெளிவாகக் கேட்கவில்லை. தயவுசெய்து மைக்கை அழுத்தி மீண்டும் பேசவும்.",
    "te-IN": "క్షమించండి, మీ వాయిస్ స్పష్టంగా వినబడలేదు. దయచేసి మైక్ నొక్కి మళ్లీ మాట్లాడండి.",
    "mr-IN": "माफ करा, तुमचा आवाज स्पष्टपणे ऐकू आला नाही. कृपया माइक दाबून पुन्हा बोला.",
    "bn-IN": "দুঃখিত, আপনার কণ্ঠস্বর স্পষ্টভাবে শোনা যায়নি। দয়া করে মাইক টিপে আবার বলুন।",
    "gu-IN": "માફ કરશો, તમારો અવાજ સ્પષ્ટ સંભળાયો નથી. કૃપા કરીને માઇક દબાવીને ફરીથી બોલો.",
    "kn-IN": "ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಧ್ವನಿ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮೈಕ್ ಒತ್ತಿ ಮತ್ತೆ ಮಾತನಾಡಿ.",
    "ml-IN": "ക്ഷമിക്കണം, നിങ്ങളുടെ ശബ്ദം വ്യക്തമായി കേൾക്കാനായില്ല. ദയവായി മൈക്ക് അമർത്തി വീണ്ടും സംസാരിക്കുക.",
    "pa-IN": "ਮਾਫ਼ ਕਰਨਾ, ਤੁਹਾਡੀ ਆਵਾਜ਼ ਸਾਫ਼ ਸੁਣਾਈ ਨਹੀਂ ਦਿੱਤੀ। ਕਿਰਪਾ ਕਰਕੇ ਮਾਈਕ ਦਬਾ ਕੇ ਦੁਬਾਰਾ ਬੋਲੋ।"
}

@router.post("/voice")
async def voice_chat_endpoint(
    audio: UploadFile = File(...),
    language_code: str = Form("hi-IN"),
    user_role: str = Form("student"),
    generate_audio: bool = Form(True),
    provider: str = Form("sarvam")
):
    """
    Direct voice upload endpoint.
    Receives raw user audio -> Sarvam saaras:v3 STT -> Agent Pipeline -> Sarvam bulbul:v3 + Azure Speech TTS.
    """
    audio_bytes = await audio.read()
    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Empty audio file received.")
        
    safe_filename = audio.filename or "recording.webm"
    if not any(safe_filename.endswith(ext) for ext in [".wav", ".mp3", ".webm", ".ogg", ".m4a"]):
        safe_filename = "recording.webm"

    # Transcribe audio
    if provider == "azure":
        transcript, stt_telemetry = await transcribe_audio_azure(
            audio_bytes=audio_bytes,
            language_code=language_code
        )
    else:
        transcript, stt_telemetry = await transcribe_audio_sarvam(
            audio_bytes=audio_bytes,
            filename=safe_filename,
            language_code=language_code
        )
    
    if not transcript:
        from app.config import settings
        from app.services.agent_service import synthesize_speech_dual
        
        canonical_lang = settings.normalize_language_code(language_code)
        polite_msg = SILENT_SPEECH_MESSAGES.get(canonical_lang, SILENT_SPEECH_MESSAGES["hi-IN"])
        
        audio_b64 = None
        tts_telem = {}
        if generate_audio:
            audio_b64, tts_telem = await synthesize_speech_dual(polite_msg, canonical_lang, provider)
            
        return {
            "status": "warning",
            "query": "",
            "language": canonical_lang,
            "response_text": polite_msg,
            "audio_base64": audio_b64,
            "intent_route": "NO_SPEECH_DETECTED",
            "is_out_of_scope": False,
            "tool_used": None,
            "citations": [],
            "transcription": "",
            "telemetry": {
                "stt": stt_telemetry,
                "tts": tts_telem
            }
        }
        
    result = await process_user_query(
        query_text=transcript,
        language_code=language_code,
        user_role=user_role,
        generate_audio=generate_audio,
        provider=provider
    )
    result["transcription"] = transcript
    result["telemetry"]["stt"] = stt_telemetry
    return result

@router.get("/health")
async def chat_health_check():
    """Health check for assistant services"""
    return {
        "status": "healthy",
        "service": "University Voice Assistant API",
        "stt_engine": "Sarvam saaras:v2",
        "tts_engine": "Sarvam bulbul:v2",
        "guardrail_engine": "Active (Intent & Out-of-Scope Filter)"
    }
