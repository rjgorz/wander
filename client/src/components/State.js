import React, { useState, useContext } from 'react';
import { Button } from 'semantic-ui-react';
import NewJournalForm from './NewJournalForm';
import UserContext from './Context';

function State({ currState, setCurrState, states, addJournal }) {
    const user = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);

    console.log(user.journals)

    return (
        <>
            {showForm ? (
                <>
                    <NewJournalForm addJournal={addJournal} setShowForm={setShowForm} currState={currState} />
                    <br />
                    <br />
                </>
            ) : null}

            <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add New Journal'}</Button>
            <h1>Current State: {currState}</h1>
        </>

    )
}

export default State;