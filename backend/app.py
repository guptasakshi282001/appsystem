from flask import Flask
from flask_cors import CORS
from flask import Flask
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os
from login import login_routes
from getuser import user_routes
from updateprofile import profile_routes
from register import register_routes

app = Flask(__name__)
CORS(app)

# Set MySQL data from environment variables
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)
mysql.init_app(app)

# Register the login_routes Blueprint
app.register_blueprint(login_routes)

# Register the user_routes Blueprint
app.register_blueprint(user_routes)

# Register the profile_routes Blueprint
app.register_blueprint(profile_routes)

# Register the register_routes Blueprint
app.register_blueprint(register_routes)

if __name__ == '__main__':
    app.run(debug=True)
