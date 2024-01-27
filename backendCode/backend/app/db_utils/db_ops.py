import sqlite3
from contextlib import contextmanager

from backend.app.db_utils.dbconfig import DATABASE_URL


@contextmanager
def db_ops():
    conn = sqlite3.connect(DATABASE_URL)
    try:
        cur = conn.cursor()
        yield cur
    except Exception as e:
        SystemError("DB operation failed.")
        conn.rollback()
        raise e
    else:
        conn.commit()
    finally:
        conn.close()
