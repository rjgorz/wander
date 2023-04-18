#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, State, Journal, Group, UserGroup, Image

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        db.session.query(State).delete()
        # db.session.query(User).delete()
        # db.session.query(Journal).delete()
        # db.session.query(UserGroup).delete()
        # db.session.query(Image).delete()
        print("Starting seed...")
        # Seed code goes here!

        alabama = State(
            name="Alabama",
            label="AL",
            fill_color="#3760f3"
        )
        alaska = State(
            name="Alaska",
            label="AK",
            fill_color="#d32535"
        )
        arizona = State(
            name="Arizona",
            label="AZ",
            fill_color="#f628d1"
        )
        arkansas = State(
            name="Arkansas",
            label="AR",
            fill_color="#c958b9"
        )
        california = State(
            name="California",
            label="CA",
            fill_color="#c3ba07"
        )
        colorado = State(
            name="Colorado",
            label="CO",
            fill_color="#4c9b1c"
        )
        connecticut = State(
            name="Connecticut",
            label="CT",
            fill_color="#ebab55"
        )
        delaware = State(
            name="Delaware",
            label="DE",
            fill_color="#31cce6"
        )
        dc = State(
            name="District of Columbia",
            label="DC",
            fill_color="#1eb1b7"
        )
        florida = State(
            name="Florida",
            label="FL",
            fill_color="#dcc6d7"
        )
        georgia = State(
            name="Georgia",
            label="GA",
            fill_color="#4dea64"
        )
        hawaii = State(
            name="Hawaii",
            label="HI",
            fill_color="#b143c0"
        )
        idaho = State(
            name="Idaho",
            label="ID",
            fill_color="#2996f6"
        )
        illinois = State(
            name="Illinois",
            label="IL",
            fill_color="#c99966"
        )
        indiana = State(
            name="Indiana",
            label="IN",
            fill_color="#ee0dbb"
        )
        iowa = State(
            name="Iowa",
            label="IA",
            fill_color="#8cb3df"
        )
        kansas = State(
            name="Kansas",
            label="KS",
            fill_color="#cd9c7c"
        )
        kentucky = State(
            name="Kentucky",
            label="KY",
            fill_color="#a15091"
        )
        louisiana = State(
            name="Louisiana",
            label="LA",
            fill_color="#f7f33a"
        )
        maine = State(
            name="Maine",
            label="ME",
            fill_color="#c59fda"
        )
        maryland = State(
            name="Maryland",
            label="MD",
            fill_color="#398dda"
        )
        massachusetts = State(
            name="Massachusetts",
            label="MA",
            fill_color="#f9f010"
        )
        michigan = State(
            name="Michigan",
            label="MI",
            fill_color="#72e9a0"
        )
        minnesota = State(
            name="Minnesota",
            label="MN",
            fill_color="#217be2"
        )
        mississippi = State(
            name="Mississippi",
            label="MS",
            fill_color="#af98bb"
        )
        missouri = State(
            name="Missouri",
            label="MO",
            fill_color="#e9dd97"
        )
        montana = State(
            name="Montana",
            label="MT",
            fill_color="#cf365a"
        )
        nebraska = State(
            name="Nebraska",
            label="NE",
            fill_color="#44b6f9"
        )
        nevada = State(
            name="Nevada",
            label="NV",
            fill_color="#fa5e1d"
        )
        newhampshire = State(
            name="New Hampshire",
            label="NH",
            fill_color="#359ac3"
        )
        newjersey = State(
            name="New Jersey",
            label="NJ",
            fill_color="#b65f84"
        )
        newmexico = State(
            name="New Mexico",
            label="NM",
            fill_color="#a4b5eb"
        )
        newyork = State(
            name="New York",
            label="NY",
            fill_color="#6c76e6"
        )
        northcarolina = State(
            name="North Carolina",
            label="NC",
            fill_color="#479ceb"
        )
        northdakota = State(
            name="North Dakota",
            label="ND",
            fill_color="#ed4a58"
        )
        ohio = State(
            name="Ohio",
            label="OH",
            fill_color="#8ffabb"
        )
        oklahoma = State(
            name="Oklahoma",
            label="OK",
            fill_color="#ae8a35"
        )
        oregon = State(
            name="Oregon",
            label="OR",
            fill_color="#c3a9f4"
        )
        pennsylvania = State(
            name="Pennsylvania",
            label="PA",
            fill_color="#898d2a"
        )
        rhodeisland = State(
            name="Rhode Island",
            label="RI",
            fill_color="#97a08d"
        )
        southcarolina = State(
            name="South Carolina",
            label="SC",
            fill_color="#4ef4b6"
        )
        southdakota = State(
            name="South Dakota",
            label="SD",
            fill_color="#bb330a"
        )
        tennessee = State(
            name="Tennessee",
            label="TN",
            fill_color="#befe61"
        )
        texas = State(
            name="Texas",
            label="TX",
            fill_color="#a0609b"
        )
        utah = State(
            name="Utah",
            label="UT",
            fill_color="#b8375b"
        )
        vermont = State(
            name="Vermont",
            label="VT",
            fill_color="#9a35a5"
        )
        virginia = State(
            name="Virginia",
            label="VA",
            fill_color="#9cc2cc"
        )
        washington = State(
            name="Washington",
            label="WA",
            fill_color="#f32370"
        )
        westvirginia = State(
            name="West Virginia",
            label="WV",
            fill_color="#868b96"
        )
        wisconsin = State(
            name="Wisconsin",
            label="WI",
            fill_color="#1ac2a2"
        )
        wyoming = State(
            name="Wyoming",
            label="WY",
            fill_color="#cc3a8c"
        )

        db.session.add_all([alabama, alaska, arizona, arkansas, california, colorado, connecticut, delaware, dc, florida, georgia, hawaii, idaho, illinois, indiana, iowa, kansas,
                        kentucky, louisiana, maine, maryland, massachusetts, michigan, minnesota, mississippi, missouri, montana, nebraska, nevada, newhampshire, newjersey,
                        newmexico, newyork, northcarolina, northdakota, ohio, oklahoma, oregon, pennsylvania, rhodeisland, southcarolina, southdakota, tennessee, texas, utah,
                        vermont, virginia, washington, westvirginia, wisconsin, wyoming])
        db.session.commit()