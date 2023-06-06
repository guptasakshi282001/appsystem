from flask import Blueprint, request, jsonify
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

register_routes = Blueprint('register_routes', __name__)

mysql = MySQL()

# Route to handle registration requests
@register_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    # Check if the  or email is already taken
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE name = %s OR email = %s", (name, email))
    user = cur.fetchone()

    if user:
        # name or email already exists
        response = {'message': 'name or email already taken'}
        return jsonify(response), 409

    # Register the new user
    cur.execute("INSERT INTO user (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    mysql.connection.commit()
    
    # User registration successful
    response = {'message': 'Registration successful'}
    return jsonify(response), 201

