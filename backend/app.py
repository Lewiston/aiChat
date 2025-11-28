from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import desc
from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

app = Flask(__name__)
CORS(app) # Connect to React


api_key = os.getenv('VITE_API_KEY')
postgres_uri = os.getenv('DB_URI')

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = postgres_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# Creating a database table
class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(12), nullable=False)
    message = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_dict(self):
        return {"id": self.id, "sender": self.sender, "message": self.message, "createdAt": self.createdAt}
    
# Function to get AI response from Google Gemini API
# def client_response(user_message):

#     try:
#         client = genai.Client(api_key=api_key)

#         response = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=user_message
#      )
#         # print(response.text)
#         return response.text
#     except Exception as e:
#         print(f"Gemini API Error: {e}")
#         return "Sorry, I'm having trouble responding right now."
    


# def save_ai_response(user_message):
#     ai_response = client_response(user_message)
#     ai_message = Message(sender="bot", message=ai_response)
#     db.session.add(ai_message)
#     db.session.commit()
#     return ("AI response added successfully"), 201
    
# API to create new message
@app.route('/api/messages', methods=['POST'])
def add_message():
    data = request.get_json()
    new_message = Message(sender=data['sender'], message=data['message'])
    # user_message = data['message']
    db.session.add(new_message)
    db.session.commit()
    # save_ai_response(user_message)
    return ("New message added successfully"), 201



# API to get all messages
@app.route('/api/messages', methods=['GET'])
def get_messages():
    # Returning everything in the database    
    all_messages = Message.query.order_by(Message.createdAt).all() # currently ordered by date created

    return jsonify([note.to_dict() for note in all_messages]), 200

# API to delete a note
@app.route('/api/messages', methods=['DELETE'])
def delete_message():
    db.session.query(Message).delete()
    db.session.commit()
    return jsonify({"message": "Messages deleted successfully"}), 200






if __name__ == '__main__':
    with app.app_context():
        db.create_all() # allow connection to db to create defined models (tables)
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, port=port, host="0.0.0.0") # Allow for debugging 