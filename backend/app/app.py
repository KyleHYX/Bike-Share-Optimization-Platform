from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

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
        polyline_data = get_fastest_route(src, dst)
        decoded_polyline = polyline.decode(polyline_data[0][0])
        parsed_line = [{'lat': line[0], 'lng': line[1]} for line in decoded_polyline]
        print(parsed_line)
        return jsonify(parsed_line)

    @app.route('/get-locations', methods=['GET'])
    @cross_origin()
    def get_location():
        return jsonify(stationsModel.get_stations())

    return app


