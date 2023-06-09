from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-journals.user', '-states.users', '-user_groups',
                       '-created_at', '-updated_at', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    journals = db.relationship('Journal', backref='user')
    images = db.relationship('Image', backref='user')
    user_groups = db.relationship('UserGroup', backref='user')

    states = association_proxy('journals', 'state')
    groups = association_proxy('user_groups', 'group')

    # @validates('username')
    # def validates_username(self, key, username):
    #     if not username or len(username) < 6:
    #         raise ValueError("Username must be at least 6 characters!")
    #     return username
    
    @validates('first_name')
    def validates_first_name(self, key, first_name):
        if not first_name:
            raise ValueError("Please provide your first name!")
        return first_name
    
    @validates('last_name')
    def validates_last_name(self, key, last_name):
        if not last_name:
            raise ValueError("Please provide your last name!")
        return last_name

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'

    serialize_rules = ('-user_groups', '-users.images',\
                       '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_groups = db.relationship('UserGroup', backref='group')
    users = association_proxy('user_groups', 'user')

class State(db.Model, SerializerMixin):
    __tablename__ = 'states'

    serialize_rules = ('-journals.user', '-journals.state',
                       '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    label = db.Column(db.String, nullable=False)
    fill_color = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    journals = db.relationship('Journal', backref='state')
    users = association_proxy('journals', 'user')

class Journal(db.Model, SerializerMixin):
    __tablename__ = 'journals'

    serialize_rules = ('-user.journals', '-user.states'
                       '-state.users', '-state.journals',
                       '-journal.user', '-images',
                       '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    visited_cities = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    images = db.relationship('Image', backref='journal')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'))

    @validates('body')
    def validates_body(self, key, body):
        if not body or len(body) < 20:
            raise ValueError("Post must be at least 20 characters long!")
        return body

class Image(db.Model, SerializerMixin):
    __tablename__ = 'images'

    serialize_rules = ('-journal.images', '-journal.user', '-journal.state',
                       '-user.images', '-user.states', '-user.journals',
                       '-created_at', '-updated_at')

    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    journal_id = db.Column(db.Integer, db.ForeignKey('journals.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

class UserGroup(db.Model, SerializerMixin):
    __tablename__ = 'user_groups'

    # serialize_rules = ('-user.journals', '-user.states',
    #                    '-group.users', '-group.journals',
    #                    '-images')

    id = db.Column(db.Integer, primary_key=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))