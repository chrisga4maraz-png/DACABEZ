import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")

    DEBUG = os.environ.get("FLASK_DEBUG", "False").lower() == "true"

    JSON_AS_ASCII = False
    TEMPLATES_AUTO_RELOAD = DEBUG

    PROJECTS_FILE = BASE_DIR / "app" / "data" / "projects.json"