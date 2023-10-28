import sqlite3
from sqlite3 import Cursor

from backend.data_collection.db_utils.db_ops import db_ops


class DBSetUp:
    def __init__(self, db_name):
        self.db_name = db_name

    def set_up_tables(self):
        self.__set_up_stations()
        self.__set_up_time_stations()
        self.__set_up_polylines()

    def __set_up_stations(self):
        with db_ops(self.db_name) as c:
            c.execute("PRAGMA foreign_keys = ON")
            # Create the stations table
            c.execute('''
                CREATE TABLE IF NOT EXISTS stations (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    latitude REAL NOT NULL,
                    longitude REAL NOT NULL
                )
                ''')

    def __set_up_time_stations(self):
        with db_ops(self.db_name) as c:
            # Create the time_stations table
            c.execute('''
                CREATE TABLE IF NOT EXISTS time_stations (
                    origin INTEGER,
                    destination INTEGER,
                    duration_value INTEGER,
                    duration_text TEXT,
                    distance_value INTEGER,
                    distance_text TEXT,
                    start_address TEXT,
                    end_address TEXT,
                    PRIMARY KEY (origin, destination),
                    FOREIGN KEY(origin) REFERENCES stations(id),
                    FOREIGN KEY(destination) REFERENCES stations(id)
                )
            ''')

    def __set_up_polylines(self):
        with db_ops(self.db_name) as c:
            # Create the polylines table
            c.execute('''
                CREATE TABLE IF NOT EXISTS polylines (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    time_station_origin INTEGER NOT NULL,
                    time_station_destination INTEGER NOT NULL,
                    polyline_data TEXT,
                    FOREIGN KEY(time_station_origin, time_station_destination) REFERENCES time_stations(origin, destination)
                )
            ''')
