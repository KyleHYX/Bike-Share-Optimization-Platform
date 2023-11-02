from flask import Flask, request, jsonify


def create_app():
    app = Flask(__name__)

    @app.route('/')
    def hello():
        return "Hello, World!"

    @app.route('/get-src-dst', methods=['POST'])
    def handle_data():
        data = request.json
        src = data.get('src')
        dst = data.get('dst')

        return jsonify({'message': 'Data received successfully', 'src': src, 'dst': dst})

    return app
