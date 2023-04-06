import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

function JournalEntry({ journal }) {
    const { title, visited_cities, body } = journal;
    return (
        <Card
            raised
            header={title}
            meta={visited_cities}
            description={body}
        />
    )
}

export default JournalEntry;

{/* <Card.Header icon as='h1'>
            <Icon name='plane' />
            {title}
        </Card.Header>
        <Card.Content>
            <p>{visited_cities}</p>
            <p>{body}</p>
        </Card.Content> */}