from datetime import timedelta
from email.message import Message
from flask import Blueprint, current_app, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required, unset_jwt_cookies

from api.models import db, User, Post
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import CORS
from flask_mail import Message
from api.mail_extension import mail

api = Blueprint('api', __name__)
CORS(api)

#get 1 post 
@api.route('/post/<int:post_id>', methods=['GET'])
@jwt_required()
def get_post(post_id):
    try:
        post = Post.query.get(post_id)
        
        if not post:
            return jsonify({'message': 'Post not found'}), 404
        
        return jsonify(post.serialize()), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
#get 1 post
#edit a post
@api.route('/editPost/<int:post_id>', methods=['PUT'])
@jwt_required()
def edit_post(post_id):
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        image = data.get('image')

        post = Post.query.get(post_id)
        
        if not post:
            return jsonify({'message': 'Post not found'}), 404
        
        if post.user_id != current_user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        if title:
            post.title = title
        if description:
            post.description = description
        if image:
            post.image = image
        
        db.session.commit()
        
        return jsonify({'message': 'Post updated successfully', 'post': post.serialize()}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    #edit a post
#delete a post
@api.route('/deletePost/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    try:
        current_user_id = get_jwt_identity()
        post = Post.query.get(post_id)
        if not post:
            return jsonify({'message': 'Post not found'}), 404
        if post.user_id != current_user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        db.session.delete(post)
        db.session.commit()

        return jsonify({'message':'Post deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message':str(e)}), 500
#delete a post
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
    password = User.generate_hash_password(password)

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
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return jsonify({"message": "Usuario y contraseña son requeridos"}), 400
        user = User.query.filter_by(username=username).first()
        if not user.verificated_password(password):
            return jsonify({"message": "Credenciales inválidas"}), 401

        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token, message="Login exitoso",user=user.serialize()), 200
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

@api.route('/get_user_profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    # Si no hay una imagen personalizada, asigna una imagen predeterminada
    if not user.image:
        user.image ='/img/default-image.jpg'
    
    return jsonify(user.serialize()), 200


if __name__ == '__main__':
    api.run(debug=True)
