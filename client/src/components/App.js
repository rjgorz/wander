import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import USMap from "./USMap";
import State from "./State";
import Login from "./Login";
import JournalEntry from "./JournalEntry";
import UserContext from './Context';
import { Card } from "semantic-ui-react";

function App() {
  const [states, setStates] = useState([]);
  const [currState, setCurrState] = useState({});
  const [userJournals, setUserJournals] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    username: "",
    _password_hash: "",
    journals: [],
    images: [],
    states: []
  });

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, []);

  useEffect(() => {
    fetch("/states").then((r) => {
      if (r.ok) {
        r.json().then((stateData) => setStates(stateData))
      }
    })
  }, []);

  function addJournal(newJournal) {
    setUserJournals([newJournal, ...userJournals]);
  }

  const journals = userJournals.map(journal => <JournalEntry key={journal.id} journal={journal} />)

  if (user.id === 0) {
    return <Login onLogin={setUser} />
  } else {
    return (
      <UserContext.Provider value={user}>
        <Nav setUser={setUser} />
        <Switch>
          <Route exact path='/'>
            <USMap currState={currState} setCurrState={setCurrState} setUserJournals={setUserJournals} />
          </Route>
          <Route path={`/${currState}`}>
            <State currState={currState} states={states} addJournal={addJournal} userJournals={userJournals} />
          </Route>
          <Route path='/my_journals'>
            <Card.Group itemsPerRow={3}>
              {journals}
            </Card.Group>
          </Route>
        </Switch>
      </UserContext.Provider>
    )
  }
}

export default App;
