#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, State, Journal, Group

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        db.session.query(State).delete()
        db.session.query(Journal).delete()
        print("Starting seed...")
        # Seed code goes here!

        alabama = State(
            name="Alabama",
            label="AL"
        )
        alaska = State(
            name="Alaska",
            label="AK"
        )
        arizona = State(
            name="Arizona",
            label="AZ"
        )
        arkansas = State(
            name="Arkansas",
            label="AR"
        )
        california = State(
            name="California",
            label="CA"
        )
        colorado = State(
            name="Colorado",
            label="CO"
        )
        connecticut = State(
            name="Connecticut",
            label="CT"
        )
        delaware = State(
            name="Delaware",
            label="DE"
        )
        dc = State(
            name="District of Columbia",
            label="DC"
        )
        florida = State(
            name="Florida",
            label="FL"
        )
        georgia = State(
            name="Georgia",
            label="GA"
        )
        hawaii = State(
            name="Hawaii",
            label="HI"
        )
        idaho = State(
            name="Idaho",
            label="ID"
        )
        illinois = State(
            name="Illinois",
            label="IL"
        )
        indiana = State(
            name="Indiana",
            label="IN"
        )
        iowa = State(
            name="Iowa",
            label="IA"
        )
        kansas = State(
            name="Kansas",
            label="KS"
        )
        kentucky = State(
            name="Kentucky",
            label="KY"
        )
        louisiana = State(
            name="Louisiana",
            label="LA"
        )
        maine = State(
            name="Maine",
            label="ME"
        )
        maryland = State(
            name="Maryland",
            label="MD"
        )
        massachusetts = State(
            name="Massachusetts",
            label="MA"
        )
        michigan = State(
            name="Michigan",
            label="MI"
        )
        minnesota = State(
            name="Minnesota",
            label="MN"
        )
        mississippi = State(
            name="Mississippi",
            label="MS"
        )
        missouri = State(
            name="Missouri",
            label="MO"
        )
        montana = State(
            name="Montana",
            label="MT"
        )
        nebraska = State(
            name="Nebraska",
            label="NE"
        )
        nevada = State(
            name="Nevada",
            label="NV"
        )
        newhampshire = State(
            name="New Hampshire",
            label="NH"
        )
        newjersey = State(
            name="New Jersey",
            label="NJ"
        )
        newmexico = State(
            name="New Mexico",
            label="NM"
        )
        newyork = State(
            name="New York",
            label="NY"
        )
        northcarolina = State(
            name="North Carolina",
            label="NC"
        )
        northdakota = State(
            name="North Dakota",
            label="ND"
        )
        ohio = State(
            name="Ohio",
            label="OH"
        )
        oklahoma = State(
            name="Oklahoma",
            label="OK"
        )
        oregon = State(
            name="Oregon",
            label="OR"
        )
        pennsylvania = State(
            name="Pennsylvania",
            label="PA"
        )
        rhodeisland = State(
            name="Rhode Island",
            label="RI"
        )
        southcarolina = State(
            name="South Carolina",
            label="SC"
        )
        southdakota = State(
            name="South Dakota",
            label="SD"
        )
        tennessee = State(
            name="Tennessee",
            label="TN"
        )
        texas = State(
            name="Texas",
            label="TX"
        )
        utah = State(
            name="Utah",
            label="UT"
        )
        vermont = State(
            name="Vermont",
            label="VT"
        )
        virginia = State(
            name="Virginia",
            label="VA"
        )
        washington = State(
            name="Washington",
            label="WA"
        )
        westvirginia = State(
            name="West Virginia",
            label="WV"
        )
        wisconsin = State(
            name="Wisconsin",
            label="WI"
        )
        wyoming = State(
            name="Wyoming",
            label="WY"
        )

        db.session.add_all([alabama, alaska, arizona, arkansas, california, colorado, connecticut, delaware, dc, florida, georgia, hawaii, idaho, illinois, indiana, iowa, kansas,
                        kentucky, louisiana, maine, maryland, massachusetts, michigan, minnesota, mississippi, missouri, montana, nebraska, nevada, newhampshire, newjersey,
                        newmexico, newyork, northcarolina, northdakota, ohio, oklahoma, oregon, pennsylvania, rhodeisland, southcarolina, southdakota, tennessee, texas, utah,
                        vermont, virginia, washington, westvirginia, wisconsin, wyoming])
        db.session.commit()