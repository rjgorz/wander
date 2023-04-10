#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, State, Journal, Group

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
        journal_dicts = [journal.to_dict() for journal in Journal.query.filter(Journal.user_id == id)]

        return make_response(
            journal_dicts,
            200
        )
api.add_resource(UserJournalsById, '/user_journals/<int:id>')

# To post a new journal, regardless of which state the user is in
class Journals(Resource):
    def post(self):
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
api.add_resource(Journals, '/user_journals')

class JournalById(Resource):
    def delete(self, id):
        journal = Journal.query.filter(Journal.id == id).first()

        db.session.delete(journal)
        db.session.commit()

        return make_response({ 'success':'Journal successfully deleted' }, 200)

    def patch(self, id):
        journal = Journal.query.filter(Journal.id == id).first()

        for attr in request.get_json():
            setattr(journal, attr, request.get_json()[attr])
        
        db.session.add(journal)
        db.session.commit()

        return make_response(
            journal.to_dict(),
            200
        )
api.add_resource(JournalById, '/user_journals/<int:id>')

class Signup(Resource):
    def post(self):
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

        try:
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return make_response(
                user.to_dict(rules=(('journals', 'states', 'groups'))),
                201
            )

        except IntegrityError:  
            return make_response({'error': '422 Unprocessable Entity'}, 422)
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return make_response(
                user.to_dict(rules=(('journals','states', 'groups'))),
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
                    user.to_dict(rules=(('journals','states', 'groups'))),
                    200
                )

        return make_response({'error': '401 Unauthorized'}, 401)
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
