import React, { useContext, useState } from 'react';
import UserContext from './Context';
import { Header, Statistic, Icon, Divider, Button } from 'semantic-ui-react';

function Profile() {
    const user = useContext(UserContext);
    const [showJoin, setShowJoin] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const uniqueStates = []
    for (const state of user.states) {
        if (!uniqueStates.includes(state.name)) {
            uniqueStates.push(state.name)
        }
    }

    let avg = 0;
    for (const journal of user.journals) {
        avg += journal.duration;
    }
    avg = avg / user.journals.length;

    const groups = user.groups.map(group => group.name);

    return (
        <>
            <Header size='huge'>{user.first_name + ' ' + user.last_name}</Header>
            <br />

            <Statistic.Group widths='three'>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='pencil alternate' size='small' />
                        {' ' + user.journals.length}
                    </Statistic.Value>
                    <Statistic.Label>{user.journals.length === 1 ? 'Journal' : 'Journals'}</Statistic.Label>
                    <Statistic.Label>Written</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='plane' size='small' />
                        {' ' + uniqueStates.length}
                    </Statistic.Value>
                    <Statistic.Label>{uniqueStates.length === 1 ? 'State' : 'States'}</Statistic.Label>
                    <Statistic.Label>Visited</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='calendar alternate outline' size='small' />
                        {' ' + avg}
                    </Statistic.Value>
                    <Statistic.Label>Average</Statistic.Label>
                    <Statistic.Label>Trip Length</Statistic.Label>
                </Statistic>
            </Statistic.Group>
            <br />
            <br />
            <Divider />
            <br />
            <Header size='large'>Groups</Header>
            {user.groups.length > 0 ? groups : <h3>You are not in any groups. Join or create one now!</h3>}
            <br />
            <br />
            <Button.Group>
                <Button onClick={() => setShowJoin(!showJoin)}>Join a Group!</Button>
                <Button.Or />
                <Button onClick={() => setShowCreate(!showCreate)}>Create a Group!</Button>
            </Button.Group>
        </>

    )
}

export default Profile;