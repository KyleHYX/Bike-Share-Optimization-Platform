from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from backend.app.location_services.fastest_route import get_fastest_route
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
        data = request.json
        src = data.get('src')
        dst = data.get('dst')
        get_fastest_route(src, dst)

        return jsonify({'message': 'Data received successfully', 'src': src, 'dst': dst})

    @app.route('/get-locations', methods=['GET'])
    @cross_origin()
    def get_location():
        return jsonify(stationsModel.get_stations())

    return app


