
from datetime import datetime

from flask import Flask

from config import Config


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    from app.routes import main
    app.register_blueprint(main)

    @app.context_processor
    def inject_global_data():
        return {
            "current_year": datetime.now().year,
            "site_name": "DACABEZ"
        }

    return app
