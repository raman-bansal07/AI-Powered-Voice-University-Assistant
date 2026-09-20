import os
from typing import Dict
from pathlib import Path
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Explicitly load .env from backend directory
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings(BaseSettings):
    # Sarvam AI
    SARVAM_API_KEY: str = os.getenv("SARVAM_API_KEY", "sk_zp1562cc_hKTU1Al2uAGpfaOVbqVuTmF2")
    SARVAM_STT_MODEL: str = os.getenv("SARVAM_STT_MODEL", "saaras:v3")
    SARVAM_TTS_MODEL: str = os.getenv("SARVAM_TTS_MODEL", "bulbul:v3")
    
    # Azure OpenAI
    AZURE_OPENAI_API_KEY: str = os.getenv("AZURE_OPENAI_API_KEY", "")
    AZURE_OPENAI_ENDPOINT: str = os.getenv("AZURE_OPENAI_ENDPOINT", "")
    AZURE_OPENAI_DEPLOYMENT: str = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4o-mini")
    AZURE_SPEECH_KEY: str = os.getenv("AZURE_SPEECH_KEY", "")
    AZURE_SPEECH_REGION: str = os.getenv("AZURE_SPEECH_REGION", "centralindia")

    # Azure AI Search
    AZURE_SEARCH_API_KEY: str = os.getenv("AZURE_SEARCH_API_KEY", "")
    AZURE_SEARCH_ENDPOINT: str = os.getenv("AZURE_SEARCH_ENDPOINT", "")
    AZURE_SEARCH_INDEX_NAME: str = os.getenv("AZURE_SEARCH_INDEX_NAME", "university-rulebook")
    
    # Server
    BACKEND_HOST: str = os.getenv("BACKEND_HOST", "0.0.0.0")
    BACKEND_PORT: int = int(os.getenv("BACKEND_PORT", "8000"))
    
    # Supported Indian Languages mapping to Sarvam / Azure codes & speaker profiles
    LANGUAGE_MAPPINGS: Dict[str, Dict[str, str]] = {
        "hi-IN": {
            "name": "Hindi",
            "native": "हिन्दी",
            "sarvam_stt_code": "hi-IN",
            "sarvam_tts_code": "hi-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "hi-IN-SwaraNeural"
        },
        "en-IN": {
            "name": "English (India)",
            "native": "English (IN)",
            "sarvam_stt_code": "en-IN",
            "sarvam_tts_code": "en-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "en-IN-NeerjaNeural"
        },
        "ta-IN": {
            "name": "Tamil",
            "native": "தமிழ்",
            "sarvam_stt_code": "ta-IN",
            "sarvam_tts_code": "ta-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "ta-IN-PallaviNeural"
        },
        "te-IN": {
            "name": "Telugu",
            "native": "తెలుగు",
            "sarvam_stt_code": "te-IN",
            "sarvam_tts_code": "te-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "te-IN-ShrutiNeural"
        },
        "mr-IN": {
            "name": "Marathi",
            "native": "मराठी",
            "sarvam_stt_code": "mr-IN",
            "sarvam_tts_code": "mr-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "mr-IN-AarohiNeural"
        },
        "bn-IN": {
            "name": "Bengali",
            "native": "বাংলা",
            "sarvam_stt_code": "bn-IN",
            "sarvam_tts_code": "bn-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "bn-IN-TanishaaNeural"
        },
        "gu-IN": {
            "name": "Gujarati",
            "native": "ગુજરાતી",
            "sarvam_stt_code": "gu-IN",
            "sarvam_tts_code": "gu-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "gu-IN-DhwaniNeural"
        },
        "kn-IN": {
            "name": "Kannada",
            "native": "ಕನ್ನಡ",
            "sarvam_stt_code": "kn-IN",
            "sarvam_tts_code": "kn-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "kn-IN-SapnaNeural"
        },
        "ml-IN": {
            "name": "Malayalam",
            "native": "മലയാളം",
            "sarvam_stt_code": "ml-IN",
            "sarvam_tts_code": "ml-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "ml-IN-SobhanaNeural"
        },
        "pa-IN": {
            "name": "Punjabi",
            "native": "ਪੰਜਾਬੀ",
            "sarvam_stt_code": "pa-IN",
            "sarvam_tts_code": "pa-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "pa-IN-GurpreetNeural"
        },
        "or-IN": {
            "name": "Odia",
            "native": "ଓଡ଼ିଆ",
            "sarvam_stt_code": "od-IN",
            "sarvam_tts_code": "od-IN",
            "sarvam_speaker": "priya",
            "azure_voice": "hi-IN-SwaraNeural"
        }
    }

settings = Settings()
