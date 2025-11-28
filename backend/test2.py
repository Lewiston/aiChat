from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from google import genai
import os
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

load_dotenv()

app = Flask(__name__)
CORS(app) # Connect to React

api_key = os.getenv('API_KEY')
# password = os.getenv('DB_PASSWORD')
# db_uri = os.getenv('DB_URI')
# postgres_uri = os.getenv('POSTGRES')

# Database Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:{password}@localhost/aiChat_db'

# app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)


# Creating a database table
# class Message(db.Model):
#     __tablename__ = 'messages'

#     id = db.Column(db.Integer, primary_key=True)
#     sender = db.Column(db.String(12), nullable=False)
#     message = db.Column(db.Text, nullable=False)
#     createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now)

#     def to_dict(self):
#         return {"id": self.id, "sender": self.sender, "message": self.message, "createdAt": self.createdAt}

def db_conn():
    try:
        conn = psycopg2.connect(
        host=os.getenv("db_host"),
        database=os.getenv("db_name"),
        user=os.getenv("db_user"),
        password=os.getenv("db_pass"),
        port=os.getenv("db_port"),
        sslmode='require')
        # ,
        # cursor_factory=DictCursor)
    
        return conn
    except Exception as e:
        return "Error connecting to db", e
    

# def create_table():
#     '''
#     Docstring for create_table
#     '''
#     try:
#         conn = db_conn()
#         cursor = conn.cursor()

#         cursor.execute("""
#             create table messages (
#                     id serial primary key,
#                     sender varchar(255) not null,
#                     message text not null,
#                     created_at timestamp default now()
#                     );
#         """)
        
#         print("Table successfully created")
#     except Exception as e:
#         print(e)
    

# Function to get AI response from Google Gemini API
def client_response(user_message):
    '''
    Docstring for client_response
    
    :param user_message: Description
    '''
    try:
        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_message
     )
        # print(response.text)
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return "Sorry, I'm having trouble responding right now."
    

def save_ai_response(user_message):
    ai_response = client_response(user_message)
    ai_message = Message(sender="bot", message=ai_response)
    # db.session.add(ai_message)
    # db.session.commit()
    conn = db_conn()
    cursor = conn.cursor()

    cursor.execute("""
        insert into messages (sender, message)
        values (%s, %s)
    """, ('bot', ai_response))

    conn.commit()

    return ("AI response added successfully"), 201
    
# API to create new message
@app.route('/api.messages', methods=['POST'])
def add_message():
    data = request.get_json()
    new_message = Message(sender=data['sender'], message=data['message'])
    user_message = data['message']

    conn = db_conn()
    cursor = conn.cursor()

    cursor.execute("""
        insert into messages (sender, message)
        values (%s, %s)
    """, ('user', user_message))

    conn.commit()

    # db.session.add(new_message)
    # db.session.commit()
    save_ai_response(user_message)
    return ("New message added successfully"), 201


# API to get all messages
@app.route('/api.messages', methods=['GET'])
def get_messages():
    # Returning everything in the database    
    #all_messages = Message.query.order_by(Message.createdAt).all() # currently ordered by date created
    conn = db_conn()
    cursor = conn.cursor()

    all_messages = cursor.execute("select * from messages;")
    # return jsonify([note.to_dict() for note in all_messages]), 200
    return jsonify({
        'status': 'success',
        'response': all_messages
    }), 200


if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all() # allow connection to db to create defined models (tables)
    app.run(debug=True) # Allow for debugging 
