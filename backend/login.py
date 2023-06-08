from flask import Blueprint, request, jsonify, redirect
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

login_routes = Blueprint('login_routes', __name__)

# Set up MySQL connection and configure data from environment variables
mysql = MySQL()

# Route to handle login requests
@login_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Check if the user exists in the database
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE email = %s", (email,))
    user = cur.fetchone()

    if user is not None and user[2] == password:
        # User exists and password matches
        # Redirect to the /user endpoint with the email as a query parameter
        return redirect(f"/user?email={email}", code=302)
    else:
        # Invalid credentials or user not found
        response = {'message': 'Invalid name or password'}
        return jsonify(response), 401

