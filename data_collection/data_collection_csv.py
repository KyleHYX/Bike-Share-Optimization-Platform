import csv

import requests
import polyline


class DataCollectionCsv:
    def __init__(self):
        pass

    def store_stations_in_csv(self, stations: list[dict], filename: str):
        """
        Description:
            Store stations into cvs file.
        :param stations: list[dict] stations to store
        :param filename: str name of the file to store
        :return:
        """
        with open(filename, 'a', newline='') as file:
            writer = csv.writer(file)
            for station in stations:
                writer.writerow([station["name"], station["latitude"], station["longitude"]])

    def get_vancouver_bike_stations(self) -> list[dict]:
        """
        Description:
            Use GBFS url to acquire all bike stations in vancouver.

        :return:
            stations: list[dict] list of dictionary mapping stations name, lat, long.
        """
        # GBFS url for mobi stations
        url = "https://vancouver-gbfs.smoove.pro/gbfs/2/en/station_information.json"
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()

        json_stations = data["data"]["stations"]

        stations = []

        for json_station in json_stations:
            station = {
                "name": json_station["name"],
                "latitude": json_station["lat"],
                "longitude": json_station["lon"]
            }
            stations.append(station)

        return stations

    def __get_direction(self, origin_lat, origin_lon, dest_lat, dest_lon, api_key):
        base_url = "https://maps.googleapis.com/maps/api/directions/json?"
        params = {
            "origin": f"{origin_lat},{origin_lon}",
            "destination": f"{dest_lat},{dest_lon}",
            "mode": "bicycling",
            "key": api_key
        }

        response = requests.get(base_url, params=params)
        data = response.json()
        route = data['routes'][0]
        legs = route['legs'][0]

        result = {
            "duration_value": legs['duration']['value'],
            "distance_value": legs['distance']['value'],
            "start_address": legs['start_address'],
            "end_address": legs['end_address'],
            "polyline": route['overview_polyline']['points']
        }

        return result

    def __insert_edges_into_csv(self, origin_id, destination_id, directions_data, station_time_writer, polyline_writer):
        station_time_writer.writerow([origin_id, destination_id,
                                      directions_data['duration_value'],
                                      directions_data['distance_value']])

        decoded_polyline = polyline.decode(directions_data['polyline'])
        polyline_writer.writerow([origin_id, destination_id, decoded_polyline])

    def __query_store_direction(self, stations, i, j, API_KEY, station_time_writer, polyline_writer):
        origin = stations[i]
        destination = stations[j]

        direction_data = self.__get_direction(origin['latitude'], origin['longitude'],
                                              destination['latitude'], destination['longitude'],
                                              API_KEY)

        if direction_data:
            self.__insert_edges_into_csv(origin['name'], destination['name'], direction_data, station_time_writer, polyline_writer)

    def query_store_directions(self, stations, API_KEY, station_time_file, polyline_file):
        with open(station_time_file, 'a', newline='') as station_time_file, open(polyline_file, 'a', newline='') as polyline_file:
            station_time_writer = csv.writer(station_time_file)
            polyline_writer = csv.writer(polyline_file)

            for i in range(50):
                for j in range(i + 1, 50):
                    self.__query_store_direction(stations, i, j, API_KEY, station_time_writer, polyline_writer)
                    self.__query_store_direction(stations, j, i, API_KEY, station_time_writer, polyline_writer)