import os

if os.getenv("ENV") != 'production':
    from dotenv import load_dotenv
    from pathlib import PurePath

    # get env variables
    env_path = PurePath('./.env')
    load_dotenv(dotenv_path=env_path)

def get_env(env):
    return os.getenv(env)