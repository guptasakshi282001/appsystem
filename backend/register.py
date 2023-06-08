from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

register_routes = Blueprint('register_routes', __name__)

bcrypt = Bcrypt()
mysql = MySQL()

# Route to handle registration requests
@register_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE name = %s OR email = %s", (name, email))
    user = cur.fetchone()

    if user:
        # Name or email already exists
        response = {'message': 'Name or email already taken'}
        return jsonify(response), 409

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Register the new user with the hashed password
    cur.execute("INSERT INTO user (name, email, password) VALUES (%s, %s, %s)", (name, email, hashed_password))
    mysql.connection.commit()
    
    # User registration successful
    response = {'message': 'Registration successful'}
    return jsonify(response), 201