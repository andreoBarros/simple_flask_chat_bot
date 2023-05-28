import glob
from datetime import date

from flask import json
from sqlalchemy import Date, text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

from database_connection import engine, get_session


class BaseModel(DeclarativeBase):
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[date] = mapped_column(Date, server_default=func.now())


def import_models():
    models_dir = glob.glob("models/*.py")
    for filename in models_dir:
        filename = filename.replace('\\', '.').replace('.py', '')
        if "basemodel" or "__init__" not in filename:
            _ = __import__(filename).__dict__[filename.split('.')[-1]]


def create_database():
    import_models()

    database_metadata = BaseModel.metadata
    database_metadata.create_all(bind=engine)
    fill_database()


@get_session
def fill_database(session: Session):
    from models.chatbot import ChatBotStorage
    query = session.execute(text("SELECT id FROM chat_bot_storage")).all()
    if not query:
        with open(file="../database/knowledge_base.json", mode="r") as fp:
            contents = json.load(fp=fp)
            session.bulk_insert_mappings(mapper=ChatBotStorage, mappings=contents)
            session.commit()
            session.close()
