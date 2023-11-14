from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from backend.app.graph.station_graph import StationGraph
from backend.app.location_services.fastest_route import get_fastest_route
from backend.app.stations_model import StationsModel
import polyline


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
        data = request.json
        src = data.get('src')
        dst = data.get('dst')
        opt = data.get('opt')
        if opt == 0:
            parsed_data = get_fastest_route(src, dst)
            print(parsed_data)
            return jsonify(parsed_data)
        elif opt == 1:
            sg = StationGraph()
            parsed_data = sg.find_free_route(src, dst, 8)
            print(parsed_data)
            return jsonify(parsed_data)

    @app.route('/get-locations', methods=['GET'])
    @cross_origin()
    def get_location():
        return jsonify(stationsModel.get_stations())

    return app


