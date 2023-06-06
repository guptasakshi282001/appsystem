from flask import Blueprint, request, jsonify
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

profile_routes = Blueprint('profile_routes', __name__)

mysql = MySQL()

# Route to update user profile
@profile_routes.route('/update-profile', methods=['PUT'])
def update_profile():
    data = request.get_json()
    name = data['name']
    email = data['email']
    

    # Update the user profile in the database
    cur = mysql.connection.cursor()
    cur.execute("UPDATE user SET name = %s WHERE email = %s", (name, email))
    mysql.connection.commit()

    # Profile update successful
    response = {'message': 'Profile updated successfully'}
    return jsonify(response), 200

