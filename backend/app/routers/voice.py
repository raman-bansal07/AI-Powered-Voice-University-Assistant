"""
Direct Voice Endpoints for standalone STT and TTS testing.
"""

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional
from app.services.sarvam_service import transcribe_audio_sarvam, synthesize_speech_sarvam

router = APIRouter(prefix="/api/voice", tags=["Direct Voice Testing"])

class TTSRequest(BaseModel):
    text: str
    language_code: Optional[str] = "hi-IN"
    speaker: Optional[str] = None

@router.post("/stt")
async def standalone_stt(
    audio: UploadFile = File(...),
    language_code: str = Form("hi-IN")
):
    """Direct STT transcription endpoint"""
    audio_bytes = await audio.read()
    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Audio file empty")
        
    transcript, telemetry = await transcribe_audio_sarvam(
        audio_bytes=audio_bytes,
        filename=audio.filename or "audio.wav",
        language_code=language_code
    )
    return {
        "transcript": transcript,
        "language_code": language_code,
        "telemetry": telemetry
    }

@router.post("/tts")
async def standalone_tts(req: TTSRequest):
    """Direct TTS synthesis endpoint"""
    if not req.text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
        
    audio_base64, telemetry = await synthesize_speech_sarvam(
        text=req.text,
        language_code=req.language_code or "hi-IN",
        speaker=req.speaker
    )
    return {
        "audio_base64": audio_base64,
        "text": req.text,
        "language_code": req.language_code,
        "telemetry": telemetry
    }
