from fastapi import FastAPI, File, UploadFile
import os
from pathlib import Path

app = FastAPI()

UPLOAD_DIR = Path("audio_files")
UPLOAD_DIR.mkdir(exist_ok=True)  # Ensure upload directory exists

@app.post("/upload/")
async def upload_audio(file: UploadFile = File(...)):
    file_location = UPLOAD_DIR / file.filename
    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())
    return {"filename": file.filename, "message": "File uploaded successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)