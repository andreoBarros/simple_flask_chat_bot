from typing import List, Type

from sqlalchemy.orm import Session

from crud import crud_basemodel
from models.chatbot import ChatBotStorage


def create_new_input(new_input: ChatBotStorage, session: Session) -> ChatBotStorage:
    return crud_basemodel.create(new_object=new_input, session=session)


def get_bot_data(session: Session) -> List[Type[ChatBotStorage]]:
    return session.query(ChatBotStorage).all()
