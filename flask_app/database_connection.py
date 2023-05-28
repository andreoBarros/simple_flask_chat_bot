from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from core.config import settings

engine = create_engine(url=settings.DATABASE_URL)


def create_session() -> Session:
    return sessionmaker(bind=engine)()


def get_session(func: callable) -> callable:
    session = create_session()

    def wrap():
        result = func(session)
        return result

    return wrap
