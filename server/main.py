from flask import json, jsonify, request, send_from_directory
import redis
from pyle38 import Tile38
from pyle38.commands.nearby import Nearby

def register_routes(app):
    @app.route('/')
    def home():
        return send_from_directory(app.static_folder,'index.html')

    @app.route('/about')
    def example():
        return jsonify({'about': 'About me info here'})
       

    @app.route('/track', methods=['POST'])
    async def track_car():
        data = request.json
        lat = data.get('latitude')
        lon = data.get('longitude')
        truck = data.get('truck')
        
        client = redis.Redis(host='127.0.0.1', port=9851)
        # insert data
        result = client.execute_command('SET', 'fleet', truck, 'POINT', lat, lon)
        # print result
        print (result)
        tile38 = Tile38(url="redis://localhost:9851", follower_url="redis://localhost:9851")
        
        
        await tile38.set("fleet", truck).point(lat, lon).exec()
        
        response = await tile38.nearby("fleet").point(52.250212, 13.370871).asPoints()
        assert response.ok

        # print(response.dict())
        await tile38.quit()
        return response.dict()

    # asyncio.run(track_car())
        
        

