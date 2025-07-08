from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from chatbot_backend import chatbot_response
from PIL import Image
import io

app = FastAPI()

app.add_middleware'](
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(message: str = Form(None), image: UploadFile = File(None)):
    image_pil = None
    if image:
        image_bytes = await image.read()
        image_pil = Image.open(io.BytesIO(image_bytes))
    response = chatbot_response(message, image_pil)
    return {"response": response}

if __name__ == "__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)