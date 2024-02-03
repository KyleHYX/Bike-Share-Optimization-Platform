import csv

from backend.app.db_utils.db_ops import db_ops
from backend.app.db_utils.db_setup import DBSetUp


def read_stations_csv_to_db(stations_csv):
    with open(stations_csv, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            with db_ops() as c:
                c.execute('''
                    INSERT INTO stations (name, latitude, longitude)
                    VALUES (?, ?, ?)
                    ''', row)

def read_stations_time_csv_to_db(stations_time_csv):
    with open(stations_time_csv, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            with db_ops() as c:
                c.execute('''
                    INSERT INTO time_stations (origin, destination, duration_value, distance_value)
                    VALUES (?, ?, ?, ?)
                    ''', row)

def read_stations_time_csv_to_bd(stations_time_csv):
    with open(stations_time_csv, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            with db_ops() as c:
                c.execute('''
                    INSERT INTO polylines (time_station_origin, time_station_destination, polyline_data)
                    VALUES (?, ?, ?)
                    ''', row)


if __name__ == '__main__':
    db_setup = DBSetUp()
    db_setup.set_up_tables()

    read_stations_csv_to_db('stations_test1.csv')
    read_stations_time_csv_to_db('stations_time_test1.csv')
    read_stations_time_csv_to_bd('polyline_test1.csv')
