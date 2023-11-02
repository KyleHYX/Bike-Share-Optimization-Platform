from backend.data_collection.data_collection import DataCollection
from backend.data_collection.db_setup import DBSetUp

if __name__ == "__main__":
    db_name = "test1.db"
    API_KEY = ''

    db_setup = DBSetUp(db_name)
    db_setup.set_up_tables()

    data_collection = DataCollection(db_name)

    stations = data_collection.get_vancouver_bike_stations()
    data_collection.add_station_to_db(stations)

    data_collection.query_store_directions(stations, API_KEY)
