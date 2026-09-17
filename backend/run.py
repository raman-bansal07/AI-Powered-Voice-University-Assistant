"""
Runner script for the FastAPI backend server.
"""

import uvicorn
from app.config import settings

if __name__ == "__main__":
    print(f"Starting University Voice Assistant Backend on http://{settings.BACKEND_HOST}:{settings.BACKEND_PORT}")
    print(f"Interactive Swagger Docs available at http://localhost:{settings.BACKEND_PORT}/docs")
    uvicorn.run(
        "app.main:app",
        host=settings.BACKEND_HOST,
        port=settings.BACKEND_PORT,
        reload=True
    )
