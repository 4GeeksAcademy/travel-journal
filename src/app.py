"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import timedelta
import os
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import User, db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_cors import CORS
from flask_mail import Mail, Message
from api.mail_extension import mail

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'traveljournalproyect@gmail.com'
app.config['MAIL_PASSWORD'] = 'qwjj qogo wyjx ookt'

# Inicializa Flask-Mail con la aplicación
mail = Mail(app)

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 3600

# Initialize extensions
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
jwt = JWTManager(app)
CORS(app)

# Add the admin
setup_admin(app)
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')
# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve any other endpoint as a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json() 
    email = data.get('email')  
    user = User.query.filter_by(email = email).first()

    if not user:
        return jsonify('Unregistered email')
    token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=5))
    string_template_html = f"""
        <html>
            <body>
                <p>Click on the following <a href="https://automatic-system-rq66vjwx5w635v45-3001.app.github.dev/{token}" className="link-tx">link</a> to recover your password</p>
            </body>
        </html>
    """
    msg = Message(
        'Restablecer contraseña',
        sender='traveljournalproyect@gmail.com',
        recipients=[user.email],
        html=string_template_html
    )

    try:
        mail.send(msg)
        return jsonify({'msg':'Email sent successfully!'})
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return jsonify({'error': 'Failed to send email'}), 500


@app.route("/reset-password", methods=['POST'])
@jwt_required()
def reset_password():
    user_id = get_jwt_identity()
    new_password = request.json.get('password')
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg":"User not found"})
    user.password = user.generate_hash_password(new_password)
    db.session.commit()
    return jsonify({"msg":"Password changed successfully"})

# This only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

    