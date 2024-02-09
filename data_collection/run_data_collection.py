from data_collection_csv import DataCollectionCsv
from db_utils.data_collection_config import GOOGLE_API_KEY

if __name__ == "__main__":
    API_KEY = GOOGLE_API_KEY

    data_collection_csv = DataCollectionCsv()

    stations = data_collection_csv.get_vancouver_bike_stations()
    data_collection_csv.store_stations_in_csv(stations, 'stations_test1.csv')

    data_collection_csv.query_store_directions(stations, API_KEY,
                                               'stations_time_test1.csv', 'polyline_test1.csv')
