import sqlite3
from contextlib import contextmanager


@contextmanager
def db_ops(db_name):
    conn = sqlite3.connect(db_name)
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
