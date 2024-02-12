from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

# Step 1: Connect with Flask
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:test1234@localhost:3305/grameendb'
db = SQLAlchemy(app)

# New model for BC agent data
class BCAgent(db.Model):
    __tablename__ = 'bcagent'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), name='Name of BC')
    contact_number = db.Column(db.String(255), name='Contact Number')
    gender = db.Column(db.String(255), name='Gender')
    bank_name = db.Column(db.String(255), name='Bank Name')
    state = db.Column(db.String(255), name='State')
    district = db.Column(db.String(255), name='District')
    pincode = db.Column(db.String(255), name='Pincode')

# Step 3: Extract query from API call, query data and return the data
@app.route('/api/bcagents', methods=['GET'])
def get_bc_agents():
    state_query = request.args.get('state', default='%')
    district_query = request.args.get('district', default='%')
    gender_query = request.args.get('gender', default='%')
    bank_name_query = request.args.get('bankname', default='%')

    agents = BCAgent.query.filter(
        BCAgent.state.like(state_query),
        BCAgent.district.like(district_query),
        BCAgent.gender.like(gender_query),
        BCAgent.bank_name.like(bank_name_query)
    ).all()
    
    # Count the number of BC agents based on the query
    count = len(agents)
    
    # Construct the response
    result = {
        'count': count,
        'agents': [{
            'S.No': agent.id,
            'Name of BC': agent.name,
            'Contact Number': agent.contact_number,
            'Gender': agent.gender,
            'Bank Name': agent.bank_name,
            'State': agent.state,
            'District': agent.district,
            'Pincode': agent.pincode
        } for agent in agents]
    }
    
    return jsonify(result)


if __name__ == '__main__':
    app.run(port=5003,debug=True)


