import React from 'react';
import { Card, Icon, Divider } from 'semantic-ui-react';

function GroupJournalEntry({ journal }) {
    const { title, duration, visited_cities, body, state } = journal;
    return (
        <Card raised className='group_journal'>
            <Card.Content>
                <Card.Header icon as='h1'>
                    <Icon name='plane' />
                    {title}
                </Card.Header>
                <Divider />
                <Card.Meta>
                    {state.name + ' - ' + visited_cities + ' | ' + duration + ' days'}
                </Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default GroupJournalEntry;