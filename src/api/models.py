from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(250), nullable=True)
    post = db.relationship('Post', backref='author', lazy=True)

    def generate_hash_password(password):
        return bcrypt.generate_password_hash(password).decode('utf-8')
    
    def verificated_password(self,password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "image": self.image,
            # do not serialize the password, its a security breach
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    country = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Post {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date.isoformat(),
            "country": self.country,
            "image": self.image,
            "user_id": self.user_id,
            "author": self.author.username
        }