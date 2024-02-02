import json

import requests

from db_utils.db_ops import db_ops


class DataCollectionSql:
    def __init__(self):
        pass

    def query_store_directions(self, stations, API_KEY):
        for i in range(50):
            for j in range(i + 1, 50):
                self.__query_store_direction(stations, i, j, API_KEY)
                self.__query_store_direction(stations, j, i, API_KEY)

    def add_station_to_db(self, stations):
        with db_ops() as c:
            for station in stations:
                c.execute('''
                INSERT INTO stations (name, latitude, longitude)
                VALUES (?, ?, ?)
                ''', (station["name"], station["latitude"], station["longitude"]))

    def get_vancouver_bike_stations(self):
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
            "duration_text": legs['duration']['text'],
            "distance_value": legs['distance']['value'],
            "distance_text": legs['distance']['text'],
            "start_address": legs['start_address'],
            "end_address": legs['end_address'],
            "polyline": route['overview_polyline']['points']
        }
        return result

    def __insert_into_database(self, origin_id, destination_id, directions_data):
        with db_ops() as c:
            # Insert into time_stations table
            c.execute('''
                INSERT INTO time_stations (origin, destination, duration_value, duration_text, distance_value, distance_text, start_address, end_address)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (origin_id, destination_id, directions_data['duration_value'], directions_data['duration_text'],
                  directions_data['distance_value'], directions_data['distance_text'], directions_data['start_address'],
                  directions_data['end_address']))

            # Insert the polyline data into the polylines table
            c.execute('''
                    INSERT INTO polylines (time_station_origin, time_station_destination, polyline_data)
                    VALUES (?, ?, ?)
                ''', (origin_id, destination_id, directions_data['polyline']))

    def __query_store_direction(self, stations, i, j, API_KEY):
        origin = stations[i]
        destination = stations[j]

        direction_data = self.__get_direction(origin['latitude'], origin['longitude'],
                                              destination['latitude'], destination['longitude'],
                                              API_KEY)

        if direction_data:
            self.__insert_into_database(origin['name'], destination['name'], direction_data)

if __name__ == "__main__":
    #base_url = "https://maps.googleapis.com/maps/api/distancematrix/json?"
    base_url = "https://routes.googleapis.com/directions/v2:computeRoutes"
    params = {
        "origins": [f"{49.262487},{-123.114397}",],
        "destinations": [f"{49.275295},{-123.132585}",],
        "mode": "bicycling",
        "key": "AIzaSyA8XQhu2CiH7E06mKrAgMwJ61q2dytfhlc",
        "alternatives": True,
        "computeAlternativeRoutes": True
    }

    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': 'AIzaSyA8XQhu2CiH7E06mKrAgMwJ61q2dytfhlc',
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
    }

    body = {
        "origin": {
            "location": {
                "latLng": {
                    "latitude": 49.262487,
                    "longitude": -123.114397
                }
            }
        },
        "destination": {
            "location": {
                "latLng": {
                    "latitude": 49.275295,
                    "longitude": -123.132585
                }
            }
        },
        "computeAlternativeRoutes": True,
        "travelMode": "BICYCLE"
    }

    #response = requests.get(base_url, params=params)
    response = requests.post(base_url, headers=headers, data=json.dumps(body))
    data = response.json()
    print(data)