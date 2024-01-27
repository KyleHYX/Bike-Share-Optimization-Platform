import time

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from backend.app.graph.station_graph import StationGraph
from backend.app.location_services.free_route import find_free_route
from backend.app.location_services.skyline_routes import get_skyline_result
from backend.app.stations_model import StationsModel


def create_app():
    app = Flask(__name__)
    CORS(app)
    stationsModel = StationsModel()

    @app.route('/')
    def hello():
        return "Hello, World!"

    @app.route('/get-src-dst', methods=['POST'])
    @cross_origin()
    def get_src_dst():
        try:
            start_time = time.time()
            data = request.json
            src = data.get('src')[0]
            dst = data.get('dst')[0]
            preference = data.get('sliderValue')
            if preference == 0:
                sg = StationGraph()
                parsed_data = find_free_route(src, dst, 8, sg)

                end_time = time.time()
                print(f"Method took {end_time - start_time} seconds to run.")
                return jsonify(parsed_data)
            else:
                sg = StationGraph()
                parsed_data = get_skyline_result(src, dst, sg, preference)

                end_time = time.time()
                print(f"Method took {end_time - start_time} seconds to run.")
                return jsonify(parsed_data)
        except Exception as e:
            print(e)

    @app.route('/get-locations', methods=['GET'])
    @cross_origin()
    def get_location():
        return jsonify(stationsModel.get_stations())

    return app
