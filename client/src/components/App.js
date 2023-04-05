import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import USMap from "./USMap";
import State from "./State";
import Login from "./Login";
import UserContext from './Context';

function App() {
  const [states, setStates] = useState([]);
  const [currState, setCurrState] = useState({});
  const [userJournals, setUserJournals] = useState([]);
  const [user, setUser] = useState(0);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

    fetch(`/user_journals/${user.id}`).then((r) => {
      if (r.ok) {
        r.json().then((journals) => setUserJournals(journals));
      }
    });

    fetch("/states").then((r) => {
      if (r.ok) {
        r.json().then((states) => setStates(states));
      }
    });
  }, []);

  function addJournal(newJournal) {
    setUserJournals([newJournal, ...userJournals]);
  }

  if (!user) {
    return <Login onLogin={setUser} />
  } else {
    return (
      <UserContext.Provider value={user}>
        <Nav setUser={setUser} />
        <Switch>
          <Route exact path='/'>
            <USMap setCurrState={setCurrState} />
          </Route>
          <Route path={`/${currState}`}>
            <State currState={currState} setCurrState={setCurrState} states={states} addJournal={addJournal} />
          </Route>
        </Switch>
      </UserContext.Provider>
    )
  }
}

export default App;
