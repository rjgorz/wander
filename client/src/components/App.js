import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import USMap from "./USMap";
import State from "./State";
import Login from "./Login";
import Profile from "./Profile";
import GroupJournals from "./GroupJournals";
import AllJournalEntry from "./AllJournalEntry";
import UserContext from './Context';
import { Card } from "semantic-ui-react";

function App() {
  const [states, setStates] = useState([]);
  const [groups, setGroups] = useState([]);
  const [images, setImages] = useState([]);
  const [currState, setCurrState] = useState({});
  const [userJournals, setUserJournals] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
  }, [refresh]);

  useEffect(() => {
    fetch("/states").then((r) => {
      if (r.ok) {
        r.json().then((stateData) => setStates(stateData))
      }
    })
  }, []);

  useEffect(() => {
    fetch("/groups").then((r) => {
      if (r.ok) {
        r.json().then((groupData) => setGroups(groupData))
      }
    })
  }, []);

  useEffect(() => {
    fetch(`/images/${user.id}`).then((r) => {
      if (r.ok) {
        r.json().then((imageData) => setImages(imageData))
      }
    })
  }, [user]);

  function addJournal(newJournal) {
    setUserJournals([newJournal, ...userJournals]);
  }

  function addGroup(newGroup) {
    setGroups([newGroup, ...groups]);
  }

  function handleDelete(id) {
    fetch(`/user_journals/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUserJournals((journalData) =>
          journalData.filter((journal) => journal.id !== id)
        );
        setRefresh(prev => !prev);
      }
    });
  }

  function handleEdit(updatedJournal) {
    const updatedJournals = userJournals.map(ogJournal => {
      if (ogJournal.id === updatedJournal.id)
        return updatedJournal;
      else
        return ogJournal;
    });
    setUserJournals(updatedJournals);
  }

  const journals = userJournals.map(journal => <AllJournalEntry key={journal.id} journal={journal} handleDelete={handleDelete} handleEdit={handleEdit} setRefresh={setRefresh} images={images} setImages={setImages} />)

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
            <State currState={currState} states={states} addJournal={addJournal}
              userJournals={userJournals} setRefresh={setRefresh} handleDelete={handleDelete}
              handleEdit={handleEdit} images={images} setImages={setImages} />
          </Route>
          <Route path='/my_journals'>
            {journals.length > 0 ? (
              <Card.Group itemsPerRow={2}>
                {journals}
              </Card.Group>
            ) : <h2>No journal entries yet!</h2>}
          </Route>
          <Route path='/group_journals'>
            <Card.Group >
              <GroupJournals />
            </Card.Group>
          </Route>
          <Route path='/profile'>
            <Profile addGroup={addGroup} setRefresh={setRefresh} groups={groups} />
          </Route>
          <Route path='/images'>
            <h1>PLACEHOLDER</h1>
            {/* <AllUserImages /> */}
          </Route>
        </Switch>
      </UserContext.Provider>
    )
  }
}

export default App;
