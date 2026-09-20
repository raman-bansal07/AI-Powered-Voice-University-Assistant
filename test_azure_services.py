import httpx
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path("backend/.env")
load_dotenv(dotenv_path=env_path)

print("=== 1. TESTING AZURE SPEECH ===")
speech_key = os.getenv("AZURE_SPEECH_KEY")
speech_region = os.getenv("AZURE_SPEECH_REGION")
try:
    r = httpx.post(
        f"https://{speech_region}.api.cognitive.microsoft.com/sts/v1.0/issueToken",
        headers={"Ocp-Apim-Subscription-Key": speech_key},
        timeout=10.0
    )
    print(f"Azure Speech: Status {r.status_code} - Token Issued Successfully!")
except Exception as e:
    print(f"Azure Speech Error: {e}")

print("\n=== 2. TESTING AZURE OPENAI (chat/completions) ===")
oai_key = os.getenv("AZURE_OPENAI_API_KEY")
oai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT", "").rstrip("/")
oai_dep = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4o-mini")
try:
    url = f"{oai_endpoint}/openai/deployments/{oai_dep}/chat/completions?api-version=2024-02-15-preview"
    payload = {
        "messages": [{"role": "user", "content": "Say 'OK' only."}],
        "max_tokens": 5
    }
    r = httpx.post(url, headers={"api-key": oai_key, "Content-Type": "application/json"}, json=payload, timeout=15.0)
    print(f"Azure OpenAI: Status {r.status_code}")
    if r.status_code == 200:
        reply = r.json()["choices"][0]["message"]["content"].strip()
        print(f"GPT-4o-mini response: '{reply}' — CONNECTED OK")
    else:
        print(f"OpenAI Response: {r.text[:300]}")
except Exception as e:
    print(f"Azure OpenAI Error: {e}")

print("\n=== 3. TESTING AZURE AI SEARCH ===")
search_key = os.getenv("AZURE_SEARCH_API_KEY")
search_endpoint = os.getenv("AZURE_SEARCH_ENDPOINT", "").rstrip("/")
search_index = os.getenv("AZURE_SEARCH_INDEX_NAME")
try:
    url = f"{search_endpoint}/indexes?api-version=2024-07-01"
    r = httpx.get(url, headers={"api-key": search_key}, timeout=10.0)
    print(f"Azure Search: Status {r.status_code}")
    if r.status_code == 200:
        data = r.json()
        indexes = [idx.get("name") for idx in data.get("value", [])]
        print(f"Available Indexes: {indexes}")
    else:
        print(f"Search Response: {r.text[:300]}")
except Exception as e:
    print(f"Azure Search Error: {e}")
