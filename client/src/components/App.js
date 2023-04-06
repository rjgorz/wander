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
  const [user, setUser] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // auto-login
    fetch("/check_session")
      .then((r) => r.json())
      .then((user) => setUser(user));


    fetch("/states")
      .then((r) => r.json())
      .then((states) => setStates(states));
  }, []);

  useEffect(() => {
    fetch(`/user_journals/${user.id}`)
      .then((r) => r.json())
      .then((journals) => {
        console.log(userJournals)
        setUserJournals(journals);
        console.log(userJournals)
      })
  }, [refresh]);

  function addJournal(newJournal) {
    setUserJournals([newJournal, ...userJournals]);
    setRefresh(!refresh);
  }

  const journals = userJournals.map(journal => <JournalEntry key={journal.id} journal={journal} />)

  console.log(user)
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
            <State currState={currState} states={states} addJournal={addJournal} />
          </Route>
          <Route path='/my_journals'>
            <Card.Group itemsPerRow={2}>
              {journals}
            </Card.Group>
          </Route>
        </Switch>
      </UserContext.Provider>
    )
  }
}

export default App;
