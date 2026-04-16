from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:150711@db:5432/new"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ✅ MODEL
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(150))
    contact = db.Column(db.String(20))


# ✅ CREATE TABLES ALWAYS (IMPORTANT FIX)
with app.app_context():
    db.create_all()


# ✅ ROUTES
@app.route("/")
def home():
    return "Flask API Running 🚀"


@app.route("/users", methods=["GET"])
def get_users():
    try:
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
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/users", methods=["POST"])
def add_user():
    try:
        data = request.json

        user = User(
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            email=data.get("email"),
            contact=data.get("contact")
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "User added"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    try:
        user = User.query.get(id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "Deleted"})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500