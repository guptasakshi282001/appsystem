from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

app = Flask(__name__)

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'create-profile'
mysql = MySQL(app)

@app.route('/api/profiles', methods=['POST'])
def create_profile():
    data = request.get_json()
    image = data['image']
    caption = data['caption']

    # Insert the image and caption into the profiles table
    insert_query = "INSERT INTO profiles (image, caption) VALUES (%s, %s)"
    with app.app_context():
        cursor = mysql.connection.cursor()
        cursor.execute(insert_query, (image, caption))
        mysql.connection.commit()
        profile_id = cursor.lastrowid

    profile = {
        'id': profile_id,
        'image': image,
        'caption': caption
    }
    return jsonify(profile), 201

if __name__ == '__main__':
    app.run(debug=True)
