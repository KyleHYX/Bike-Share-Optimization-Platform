from data_collection_csv import DataCollectionCsv
from data_collection_sql import DataCollectionSql
from db_setup import DBSetUp

if __name__ == "__main__":
    # API_KEY = ''
    #
    # db_setup = DBSetUp()
    # db_setup.set_up_tables()
    #
    # data_collection = DataCollectionSql()
    #
    # stations = data_collection.get_vancouver_bike_stations()
    # data_collection.add_station_to_db(stations)
    #
    # data_collection.query_store_directions(stations, API_KEY)

    API_KEY = 'AIzaSyA8XQhu2CiH7E06mKrAgMwJ61q2dytfhlc'

    data_collection_csv = DataCollectionCsv()

    stations = data_collection_csv.get_vancouver_bike_stations()
    data_collection_csv.store_stations_in_csv(stations, 'stations_test1.csv')

    data_collection_csv.query_store_directions(stations, API_KEY,
                                               'stations_time_test1.csv', 'polyline_test1.csv')
