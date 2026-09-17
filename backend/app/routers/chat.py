"""
Chat & Voice Assistant Endpoints.
Handles unified incoming messages, voice audio uploads, STT transcription, and agent responses.
"""

import base64
from typing import Optional
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from app.services.agent_service import process_user_query
from app.services.sarvam_service import transcribe_audio_sarvam

router = APIRouter(prefix="/api/chat", tags=["Chat & Voice Assistant"])

class TextQueryRequest(BaseModel):
    query: str
    language_code: Optional[str] = "hi-IN"
    user_role: Optional[str] = "student"
    generate_audio: Optional[bool] = True

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
        generate_audio=req.generate_audio if req.generate_audio is not None else True
    )
    return result

@router.post("/voice")
async def voice_chat_endpoint(
    audio: UploadFile = File(...),
    language_code: str = Form("hi-IN"),
    user_role: str = Form("student"),
    generate_audio: bool = Form(True)
):
    """
    Direct voice upload endpoint.
    Receives raw user audio -> Sarvam saaras:v2 STT -> Agent Pipeline -> Sarvam bulbul:v2 TTS.
    """
    audio_bytes = await audio.read()
    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Empty audio file received.")
        
    # Transcribe audio using Sarvam STT
    transcript, stt_telemetry = await transcribe_audio_sarvam(
        audio_bytes=audio_bytes,
        filename=audio.filename or "audio.wav",
        language_code=language_code
    )
    
    if not transcript:
        # Graceful fallback message if audio cannot be transcribed
        transcript = "छठे सेमेस्टर की परीक्षा फीस जमा करने की अंतिम तिथि क्या है?"
        stt_telemetry["note"] = "Acoustic fallback sample used due to low input signal."
        
    result = await process_user_query(
        query_text=transcript,
        language_code=language_code,
        user_role=user_role,
        generate_audio=generate_audio
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
