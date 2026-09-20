import httpx
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv("backend/.env")
key = os.getenv("AZURE_OPENAI_API_KEY")

endpoints = [
    "https://university-openai.openai.azure.com",
    "https://university-openai.cognitiveservices.azure.com",
    "https://university-openai.services.ai.azure.com",
]

api_versions = [
    "2024-02-15-preview",
    "2024-06-01",
    "2024-10-21",
    "2023-05-15"
]

for ep in endpoints:
    for ver in api_versions:
        url = f"{ep}/openai/models?api-version={ver}"
        try:
            r = httpx.get(url, headers={"api-key": key}, timeout=5.0)
            print(f"{ep} ({ver}) -> Status {r.status_code}")
            if r.status_code == 200:
                print("Models:", [m.get("id") for m in r.json().get("data", [])])
                break
        except Exception as e:
            print(f"{ep} ({ver}) -> Error: {e}")
