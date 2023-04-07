from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize_rules = ('-journals', '-states.users')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))

    journals = db.relationship('Journal', backref='user')
    images = db.relationship('Image', backref='user')
    states = association_proxy('journals', 'state')

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

    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    users = db.relationship('User', backref='group')

class State(db.Model, SerializerMixin):
    __tablename__ = 'states'

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

    serialize_rules = ('-user.journals',
                       '-state.users', '-state.journals',
                       '-images')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    visited_cities = db.Column(db.String)
    body = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    images = db.relationship('Image', backref='journal')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'))

class Image(db.Model, SerializerMixin):
    __tablename__ = 'images'

    serialize_rules = ('-journal.images', '-journal.user', '-journal.state')

    id = db.Column(db.Integer, primary_key=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    journal_id = db.Column(db.Integer, db.ForeignKey('journals.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))