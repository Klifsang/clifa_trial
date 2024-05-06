from flask import Flask
from flask_cors import CORS
from server.main import register_routes

app = Flask(
    __name__, 
    static_folder='./client/dist', 
    static_url_path='')

register_routes(app)
CORS(app, origins='*')

if __name__ == '__main__':
  app.run(port=5000)
