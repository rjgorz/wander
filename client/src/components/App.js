import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import USMap from "./USMap";
import State from "./State";
import Login from "./Login";
import Profile from "./Profile";
import GroupJournals from "./GroupJournals";
import AllJournalEntry from "./AllJournalEntry";
import UserContext from './Context';
import AllUserImages from "./AllUserImages";
import { Card } from "semantic-ui-react";

function App() {
  const [states, setStates] = useState([]);
  const [groups, setGroups] = useState([]);
  const [images, setImages] = useState([]);
  const [currState, setCurrState] = useState(null);
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
  }, [user]);

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
        <div>
          <Nav setUser={setUser} />
        </div>
        <Switch>
          <Route exact path='/'>
            <USMap currState={currState} setCurrState={setCurrState} setUserJournals={setUserJournals} />
          </Route>
          <Route exact path={`/${currState}`}>
            <State currState={currState} states={states} addJournal={addJournal}
              userJournals={userJournals} setRefresh={setRefresh} handleDelete={handleDelete}
              handleEdit={handleEdit} images={images} setImages={setImages} />
          </Route>
          <Route exact path='/my_journals'>
            {journals.length > 0 ? (
              <Card.Group itemsPerRow={2}>
                {journals}
              </Card.Group>
            ) : <h2>No journal entries yet!</h2>}
          </Route>
          <Route exact path='/group_journals'>
            <Card.Group>
              <GroupJournals />
            </Card.Group>
          </Route>
          <Route exact path='/profile'>
            <Profile addGroup={addGroup} setRefresh={setRefresh} groups={groups} />
          </Route>
          <Route exact path='/images'>
            <AllUserImages images={images} setRefresh={setRefresh} setImages={setImages} />
          </Route>
        </Switch>
      </UserContext.Provider>
    )
  }
}

export default App;
