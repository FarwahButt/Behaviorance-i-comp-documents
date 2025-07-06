from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import suggestion

app = FastAPI()

app.include_router(suggestion.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # development ke liye, production me apni frontend URL lagayen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
