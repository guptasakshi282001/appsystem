from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import redirect


app = Flask(__name__)

CORS(app)

# Set MySQL data
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'login-system'

mysql = MySQL(app)

# Route to handle registration requests
@app.route('/register', methods=['POST'])
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

# Route to handle login requests
@app.route('/login', methods=['POST'])
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
    
@app.route('/user', methods=['GET'])
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

@app.route('/update-profile', methods=['PUT'])
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

if __name__ == '__main__':
    app.run(debug=True)
