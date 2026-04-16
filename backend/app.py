from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import time
from sqlalchemy.exc import OperationalError

app = Flask(__name__)
CORS(app)

# ✅ Docker DB connection
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:150711@db:5432/new"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ✅ Model
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(150))
    contact = db.Column(db.String(20))

# ✅ Create tables safely (IMPORTANT FIX)
def init_db():
    with app.app_context():
        for i in range(10):
            try:
                db.create_all()
                print("✅ Tables created")
                break
            except OperationalError:
                print("⏳ Waiting for DB...")
                time.sleep(3)

init_db()

# ✅ Routes

@app.route("/")
def home():
    return "Flask API Running 🚀"

# GET users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "email": u.email,
            "contact": u.contact
        } for u in users
    ])

# POST user
@app.route("/users", methods=["POST"])
def add_user():
    data = request.json

    user = User(
        first_name=data.get("first_name"),
        last_name=data.get("last_name"),
        email=data.get("email"),
        contact=data.get("contact")
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User added"})

# DELETE user
@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "Deleted"})

# ✅ For local testing only (Gunicorn ignores this)
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)