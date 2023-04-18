#!/usr/bin/env python3

# Standard library imports
import os

# Remote library imports
from flask import request, session, make_response, jsonify, send_from_directory
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from werkzeug.utils import secure_filename

# Local imports
from config import app, db, api
from models import User, State, Journal, Group, UserGroup, Image

app.config['UPLOAD_FOLDER'] = 'static/images/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class Index(Resource):
    def get(self):
        return(
            'Welcome to Wander'
        )

class States(Resource):
    def get(self):
        state_dicts = [state.to_dict() for state in State.query.all()]

        return make_response(
            state_dicts,
            200
        )
api.add_resource(States, '/states')


# To grab all journals for a user, displayed in the My Journals route
class UserJournalsById(Resource):
    def get(self, id):
        journal_dicts = [journal.to_dict()
                         for journal in Journal.query.filter(Journal.user_id == id)]

        return make_response(
            journal_dicts,
            200
        )
api.add_resource(UserJournalsById, '/user_journals/<int:id>')

# To post a new journal, regardless of which state the user is in
class Journals(Resource):
    def post(self):
        try:
            new_journal = Journal(
                title=request.get_json()['title'],
                duration=request.get_json()['duration'],
                visited_cities=request.get_json()['visited_cities'],
                body=request.get_json()['body'],
                user_id=request.get_json()['user_id'],
                state_id=request.get_json()['state_id']
            )

            db.session.add(new_journal)
            db.session.commit()

            return make_response(
                new_journal.to_dict(),
                201
            )

        except ValueError:
            return make_response(
                {'error': 'Post must be at least 20 characters long!'},
                400
            )
api.add_resource(Journals, '/user_journals')

class JournalById(Resource):
    def delete(self, id):
        journal = Journal.query.filter(Journal.id == id).first()

        if not journal:
            return make_response({'error': 'Journal not found'}, 404)

        images = Image.query.filter(Image.journal_id == id).all()

        for image in images:
            os.remove(os.path.join(app.config['UPLOAD_FOLDER'], image.file_name))
            db.session.delete(image)

        db.session.delete(journal)
        db.session.commit()

        return make_response({'success': 'Journal successfully deleted'}, 200)

    def patch(self, id):
        journal = Journal.query.filter(Journal.id == id).first()

        try:
            if not journal:
                return make_response({'error': 'Journal not found'}, 404)

            for attr in request.get_json():
                setattr(journal, attr, request.get_json()[attr])

            db.session.add(journal)
            db.session.commit()

            return make_response(
                journal.to_dict(),
                200
            )
        except ValueError:
            return make_response(
                {'error': 'Post must be at least 20 characters long!'},
                400
            )
api.add_resource(JournalById, '/user_journals/<int:id>')


############################################################
#                      GROUP ROUTES                        #
############################################################
class Groups(Resource):
    def get(self):
        group_dicts = [group.to_dict(rules=(('users',)))
                       for group in Group.query.all()]

        return make_response(
            group_dicts,
            200
        )

    def post(self):
        new_group = Group(
            group_name=request.get_json()['group_name']
        )

        db.session.add(new_group)
        db.session.commit()

        return make_response(
            new_group.to_dict(rules=(('users',))),
            201
        )
api.add_resource(Groups, '/groups')

class UserGroups(Resource):
    def post(self):
        new_ug = UserGroup(
            user_id=request.get_json()['user_id'],
            group_id=request.get_json()['group_id']
        )

        db.session.add(new_ug)
        db.session.commit()

        return make_response(
            new_ug.to_dict(),
            201
        )
api.add_resource(UserGroups, '/user_groups')

class UserGroupById(Resource):
    def delete(self, user_id, group_id):
        groups = UserGroup.query.filter(UserGroup.user_id == user_id).all()
        
        for group in groups:
            if group.group_id == group_id:
                db.session.delete(group)
                db.session.commit()

        return make_response({ 'success': 'Group successfully left' }, 200)
api.add_resource(UserGroupById, '/user_groups/<int:user_id>/<int:group_id>')


############################################################
#                      IMAGE ROUTES                        #
############################################################
class ImagesByIds(Resource):
    def post(self, userID, journalID):
        files = request.files.getlist('files[]')
        for file in files:
            if allowed_file(file.filename):
                file.save(os.path.join(
                    app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))
                new_image = Image(
                    file_name=secure_filename(file.filename),
                    user_id=userID,
                    journal_id=journalID
                )
                db.session.add(new_image)
                db.session.commit()

        return make_response({'message': 'Image files added successfully'}, 201)
api.add_resource(ImagesByIds, '/images_upload/<int:userID>/<int:journalID>')

class ImagesByUser(Resource):
    def get(self, userID):
        image_dicts = [image.to_dict() for image in Image.query.filter(
            Image.user_id == userID).all()]

        return make_response(
            image_dicts,
            200
        )
api.add_resource(ImagesByUser, '/images/<int:userID>')

class ImageById(Resource):
    def delete(self, id):
        image = Image.query.filter(Image.id == id).first()

        if not image:
            return make_response({ 'error':'Image not found!'}, 404)
        
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], image.file_name))
        db.session.delete(image)
        db.session.commit()

        return make_response({ 'success':'Image successfully deleted' }, 200)
api.add_resource(ImageById, '/image/<int:id>')

class ServeImage(Resource):
    def get(self, filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
api.add_resource(ServeImage, '/serve_image/<filename>')


############################################################
#                   USER LOGIN/LOGOUT                      #
############################################################
class Signup(Resource):
    def post(self):
        try:
            request_json = request.get_json()

            username = request_json.get('username')
            first_name = request_json.get('first_name')
            last_name = request_json.get('last_name')
            password = request_json.get('password')

            user = User(
                username=username,
                first_name=first_name,
                last_name=last_name,
            )
            # the setter will encrypt this
            user.password_hash = password

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return make_response(
                user.to_dict(
                    rules=(('journals', 'states', 'groups', 'groups.users'))),
                201
            )

        except IntegrityError:
            return make_response({'error': '422 Unprocessable Entity'}, 422)
        
        except ValueError:
            return make_response({'error': 'Please provide a first & last name!'}, 400)
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return make_response(
                user.to_dict(
                    rules=(('journals', 'states', 'groups', 'groups.users'))),
                200
            )

        return make_response({'error': '401 Unauthorized'}, 401)

        # return None
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id

                return make_response(
                    user.to_dict(
                        rules=(('journals', 'states', 'groups', 'groups.users'))),
                    200
                )

        return make_response({'error': 'Incorrect username/password.'}, 401)
api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None

            return make_response({}, 204)

        return make_response({'error': '401 Unauthorized'}, 401)
api.add_resource(Logout, '/logout', endpoint='logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)