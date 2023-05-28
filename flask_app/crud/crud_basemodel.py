from random import randint
from typing import TypeVar

from sqlalchemy.orm import Session

from models.basemodel import BaseModel

BaseModelClass = TypeVar("BaseModelClass", bound=BaseModel)


def create(new_object: BaseModelClass, session: Session) -> BaseModelClass:
    session.add(new_object)
    new_object.id = randint(0000000, 99999999)
    session.commit()
    session.flush()
    return new_object


def update(updated_object: BaseModelClass, session: Session) -> BaseModelClass:
    session.add(updated_object)
    session.commit()
    session.flush()
    return updated_object


def delete(target_object: BaseModelClass, session: Session) -> BaseModelClass:
    session.delete(target_object)
    session.commit()
    session.flush()
    return target_object
