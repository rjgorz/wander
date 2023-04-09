import React, { useState, useContext } from 'react';
import { Button, Card, Divider } from 'semantic-ui-react';
import NewJournalForm from './NewJournalForm';
import StateJournalEntry from './StateJournalEntry';
import UserContext from './Context';

function State({ currState, states, addJournal, userJournals, setRefresh, handleDelete, handleEdit }) {
    const user = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);

    const selectedState = states.filter(state => state.name === currState)[0];
    const stateJournals = userJournals.filter(journal => journal.state.name === selectedState.name);

    const journals = stateJournals.map(journal => <StateJournalEntry key={journal.id} journal={journal} handleDelete={handleDelete} handleEdit={handleEdit} setRefresh={setRefresh} />)

    return (
        <>
            <h1>{currState}</h1>
            <Divider />
            {journals.length > 0 ? (
            <Card.Group itemsPerRow={2}>
                {journals}
            </Card.Group>
            ) : <h2>No journal entries yet!</h2>}
            <Divider />
            {showForm ? (
                <NewJournalForm addJournal={addJournal} setShowForm={setShowForm} selectedState={selectedState} setRefresh={setRefresh} />
            ) : null}
            <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add New Journal'}</Button>
            <br />
            <br />
        </>

    )
}

export default State;

