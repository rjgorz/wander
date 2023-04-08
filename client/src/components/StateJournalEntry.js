import React from 'react';
import { Card, Icon, Divider, Button } from 'semantic-ui-react';

function StateJournalEntry({ journal, handleDelete }) {
    const { title, duration, visited_cities, body } = journal;
    return (
        <Card raised>
            <Card.Content>
                <Card.Header icon as='h1'>
                    <Icon name='plane' />
                    {title}
                    <Button inverted icon floated='right' onClick={() => handleDelete(journal.id)}>
                        <Icon size='small' name='trash alternate outline' color='black' />
                    </Button>
                </Card.Header>
                <Divider />
                <Card.Meta>
                    {visited_cities + ' | ' + duration + ' days'}
                </Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default StateJournalEntry;

{/* <Card
    raised
    header={title}
    meta={visited_cities}
    description={body}
/> */}