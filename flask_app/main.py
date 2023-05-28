from flask import Flask

from core.config import settings
from models.basemodel import create_database
from routes.chatbot import chatbot_blueprint


def run_app():
    app: Flask = Flask(import_name="FlaskChatBot", template_folder="view/templates", static_folder="view/static")
    app.register_blueprint(chatbot_blueprint)
    create_database()
    app.run(debug=settings.DEBUG, port=settings.PORT)


if __name__ == "__main__":
    run_app()
