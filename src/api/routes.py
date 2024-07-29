from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required,unset_jwt_cookies
from api.models import db, User, Post
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, User, Post
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)


#GET ALL POSTS
@api.route('/getPosts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        posts = [post.serialize() for post in posts]
        return jsonify(posts), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500


#addpost
@api.route('/addPost', methods=['POST'])
def add_post():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    country = data.get('country')
    image = data.get('image')
    user_id = data.get('user_id')

    if not title or not description or not country or not image or not user_id:
        return jsonify({'message': 'All data are required'}), 400
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        new_post = Post(
            title = title,
            description = description,
            country = country,
            image = image,
            user_id = user_id
        )
        db.session.add(new_post)
        db.session.commit()

        return jsonify({'message': 'Post created successfully', 'post': new_post.serialize()}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500
#addpost
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"}
    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        usernames = [user.serialize() for user in users]
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
        data = request.get_json()
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Usuario y contraseña son requeridos"}), 400
        user = User.query.filter_by(username=username).first()

        user = User.query.filter_by(username=username).first()
        
        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token, message="Login exitoso"), 200
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token, message="Login exitoso"), 200
        else:
            return jsonify({"message": "Credenciales inválidas"}), 401
    except SQLAlchemyError as e:
        return jsonify({"message": "Error al procesar la solicitud"}), 500
    except Exception as e:
        return jsonify({"message": "Error inesperado"}), 500

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"id": user.id, "username": user.username}), 200

@api.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    try:
        current_user_id = get_jwt_identity()
        posts = Post.query.filter_by(user_id=current_user_id).all()
        posts = [post.serialize() for post in posts]
        return jsonify(posts), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500



if __name__ == '__main__':
    api.run(debug=True)
