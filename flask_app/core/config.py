from dataclasses import dataclass

import dotenv

environment = dotenv.dotenv_values("../.env")


@dataclass
class FlaskAppSettings:
    PORT: str
    DEBUG: bool
    DATABASE_URL: str


settings = FlaskAppSettings(**environment)
