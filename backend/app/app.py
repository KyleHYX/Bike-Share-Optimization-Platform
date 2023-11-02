from flask import Flask, request, jsonify

from backend.app.stations_model import StationsModel


def create_app():
    app = Flask(__name__)
    stationsModel = StationsModel()

    @app.route('/')
    def hello():
        return "Hello, World!"

    @app.route('/get-src-dst', methods=['POST'])
    def get_src_dst():
        data = request.json
        src = data.get('src')
        dst = data.get('dst')

        return jsonify({'message': 'Data received successfully', 'src': src, 'dst': dst})

    @app.route('/get-locations', methods=['GET'])
    def get_location():
        return jsonify(stationsModel.get_stations())

    return app


