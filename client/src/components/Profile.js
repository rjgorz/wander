import { useContext, useState } from 'react';
import UserContext from './Context';
import JoinGroup from './JoinGroup';
import CreateGroup from './CreateGroup';
import { Header, Statistic, Icon, Divider, Button, List } from 'semantic-ui-react';

function Profile({ addGroup, setRefresh, groups }) {
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

    function handleLeave(groupId) {
        fetch(`/user_groups/${user.id}/${groupId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(r => {
            console.log(r);
            setRefresh(prev => !prev);
        });
    }

    const userGroups = user.groups.map(group => {
        const len = group.users.length;
        return (
            <List key={group.id}>
                <List.Item>
                    <List.Content>
                        <List.Header>{group.group_name}</List.Header>
                        <List.Description>
                            <em>{len} {len === 1 ? 'Member' : 'Members'}</em>
                        </List.Description>
                        <br />
                        <Button size='tiny' onClick={() => handleLeave(group.id)}>Leave Group</Button>
                        <br /><br /><br />
                    </List.Content>
                </List.Item>
            </List>

        )
    });

    return (
        <>
            <Header size='huge'>{user.first_name + ' ' + user.last_name}</Header>
            <br />
            <Divider />
            <br />
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
                        <Icon name='calendar alternate' size='small' />
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
            <Header size='large'>Joined Groups</Header>
            {user.groups.length > 0 ? userGroups : <h3>You are not in any groups. Join or create one now!</h3>}
            <br />
            <br />
            <Button.Group>
                <Button onClick={() => {
                    setShowJoin(!showJoin);
                    setShowCreate(false);
                }}>Join a Group!</Button>
                <Button.Or />
                <Button onClick={() => {
                    setShowCreate(!showCreate);
                    setShowJoin(false);
                }}>Create a Group!</Button>
            </Button.Group>
            <br />
            <br />
            {showCreate ? <CreateGroup addGroup={addGroup} setRefresh={setRefresh} setShowCreate={setShowCreate} /> : null}
            {showJoin ? <JoinGroup groups={groups} setRefresh={setRefresh} setShowJoin={setShowJoin} /> : null}
        </>
    )
}

export default Profile;