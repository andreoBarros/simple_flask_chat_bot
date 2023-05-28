from typing import Optional, Any, List

from sqlalchemy import Column, String
from sqlalchemy.orm import Mapped

from models.basemodel import BaseModel


class ChatBotStorage(BaseModel):
    __tablename__: str = "chat_bot_storage"
    __allow_unmapped__ = True

    response_type: Mapped[str]
    user_input: str = Column(String(500))
    answer: Mapped[str]
    required_keywords: Optional[Mapped[str]]

    def __init__(self, user_input: List, **kw: Any):
        self.user_input = str(user_input)
        super().__init__(**kw)

    def as_dict(self) -> dict:
        self_dict = self.__dict__
        print(dict)
        return self_dict
