from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

# Step 1: Connect with Flask
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Bnq12072005%40@localhost:3307/grameendb'
db = SQLAlchemy(app)
    
# Step 2: Create model (table)
class CropData(db.Model):
    __tablename__ = 'croplist'
    id = db.Column(db.Integer, primary_key=True)
    state_name = db.Column(db.String(255), name='state_name')
    district_name = db.Column(db.String(255), name='district_name')
    season = db.Column(db.String(255), name='season')
    crop = db.Column(db.String(255), name='crop')
    area = db.Column(db.Float, name='area')
    production = db.Column(db.Float, name='production')

# Step 3: Extract query from API call, query data and return the data
@app.route('/api/crops', methods=['GET'])
def get_crops():
    state_query = request.args.get('state_name', default='%')
    district_query = request.args.get('district_name', default='%')
    crop_name_query = request.args.get('crop', default='%')
    season_query = request.args.get('season', default='%')

    crops = CropData.query.filter(
        CropData.state_name.like('%' + state_query + '%'),
        CropData.district_name.like('%' + district_query + '%'),
        CropData.crop.like('%' + crop_name_query + '%'),
        CropData.season.like('%' + season_query + '%'),
    ).all()
    
    result = [{
        'state': crop.state_name,
        'district': crop.district_name,
        'crop_name': crop.crop,
        'season': crop.season,
        'area': crop.area,
        'production': crop.production,
    } for crop in crops]
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)