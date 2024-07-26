"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required,unset_jwt_cookies
from api.models import db, User
from sqlalchemy.exc import SQLAlchemyError
from api.utils import APIException



app = Flask(__name__)
api = Blueprint('api', __name__) 

# Allow CORS requests to this API
CORS(api)
CORS(app, resources={r"/*": {"origins": "https://reimagined-xylophone-976qw9x7wqg739rvw-3000.app.github.dev"}})


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        usernames = [user.username for user in users]
        return jsonify(usernames), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Todos los campos son requeridos'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'El nombre de usuario ya está en uso'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'El email ya está registrado'}), 400

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario creado satisfactoriamente'}), 201

@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        print(f"Username: {username}, Password: {password}")

        if not username or not password:
            return jsonify({"message": "Usuario y contraseña son requeridos"}), 400

        # Consulta correcta con valores de cadena
        user = User.query.filter_by(username=username, password=password).first()
        
        if user:
            return jsonify({"message": "Login exitoso"}), 200
        else:
            return jsonify({"message": "Credenciales inválidas"}), 401

    except SQLAlchemyError as e:
        # Registrar el error y devolver una respuesta general
        print(f"SQLAlchemyError: {e}")
        return jsonify({"message": "Error al procesar la solicitud"}), 500
    except Exception as e:
        # Manejar cualquier otra excepción
        print(f"Exception: {e}")
        return jsonify({"message": "Error inesperado"}), 500

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200

@api.route('/upload_profile_image', methods=['POST'])
@jwt_required()
def upload_profile_image():
    try:
        data = request.get_json()
        image_url = data.get('image_url')

        if not image_url:
            return jsonify({'message': 'No image URL provided'}), 400

        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        user.image = image_url
        db.session.commit()

        return jsonify({'message': 'Image URL saved successfully', 'image_url': image_url}), 200
    except Exception as e:
        return jsonify({'message': 'Error uploading image: ' + str(e)}), 500



@api.route('/update_user', methods=['PUT'])
@jwt_required()
def update_user():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    username = data.get('username')

    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    user.username = username
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})


if __name__ == '__main__':
    api.run(debug=True)