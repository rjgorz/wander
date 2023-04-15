# Wander - Explore Your World!

## Introduction

- Wander is a simple but elegant journaling application to jot down your thoughts and keep track of your travel history.
    - Journals can be written for each individual state across the US.
    - Include a title for your trip, places you visited, a short journal post about your experience and even attach some photos.
- When a journal is posted to a state, the map on the home page will automatically update to highlight that state in gold.
    - Keep travelling and posting journals to fill the entire map!
- Journals may be viewed in a two ways: by browsing through each individual state or all together in the "My Journals" section.
- You can create and join travel groups with other users as well and view group members' journals!
- A photo library section is also available to view all your memories in one place. 

***

## Setup


To download all required dependencies for the frontend and backend, run:
```console
$ pipenv install
$ npm install prefix --client
```


All states must be initialized by running the seed file (seed.py):
```console
$ pipenv shell
$ cd server/
$ python3 seed.py
```


Once setup is complete, the Flask API can be run on [localhost:5555](http://localhost:5555 "localhost:5555") by running:
```console
$ cd server/
$ python3 app.py
```


In a separate terminal, the React app can be run on [localhost:4000](http://localhost:4000 "localhost:4000") by running:
```console
$ cd client/
$ npm start
```

***

## Getting Started

Once the web application is up and running, you can create an account using the sign up form.

On successful sign up, you will be taken to the home page displaying the map of the United States. Select a state to get journaling!

Happy travels!

***