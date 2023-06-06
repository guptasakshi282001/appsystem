from flask import Blueprint, request, jsonify
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

user_routes = Blueprint('user_routes', __name__)
mysql = MySQL()

# Route to retrieve user details
@user_routes.route('/user', methods=['GET'])
def get_user():
    email = request.args.get('email')  # Retrieve the email from the query parameters

    if email:
        # Retrieve the user's username and email from the database
        cur = mysql.connection.cursor()
        cur.execute("SELECT name, email FROM user WHERE email = %s", (email,))
        user = cur.fetchone()

        if user:
            # User found, return the username and email
            response = {
                'name': user[0],
                'email': user[1]
            }
            return jsonify(response), 200
        else:
            # User not found
            response = {'message': 'User not found'}
            return jsonify(response), 404
    else:
        # Email parameter is missing
        response = {'message': 'Email parameter is required'}
        return jsonify(response), 400

