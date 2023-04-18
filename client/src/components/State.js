import { useState } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import NewJournalForm from './NewJournalForm';
import StateJournalEntry from './StateJournalEntry';

function State({ currState, states, addJournal, userJournals, setRefresh, handleDelete, handleEdit, images, setImages }) {
    const [open, setOpen] = useState(false);

    const selectedState = states.filter(state => state.name === currState)[0];
    const stateJournals = userJournals.filter(journal => journal.state.name === selectedState.name);

    const journals = stateJournals.map(journal => <StateJournalEntry key={journal.id} journal={journal} handleDelete={handleDelete} handleEdit={handleEdit} setRefresh={setRefresh} images={images} setImages={setImages} />)

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
            <NewJournalForm addJournal={addJournal} selectedState={selectedState} setRefresh={setRefresh} open={open} setOpen={setOpen} />
            <br />
            <br />
        </>

    )
}

export default State;

