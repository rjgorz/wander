import React, { useContext } from 'react';
import UserContext from './Context';
import { Header, Statistic, Icon } from 'semantic-ui-react';

function Profile() {
    const user = useContext(UserContext);

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

    return (
        <>
            <Header size='huge'>{user.first_name + ' ' + user.last_name}</Header>
            <br />
            <Statistic.Group widths='three'>
                <Statistic>
                    <Statistic.Value>
                        <Icon name='pencil alternate' size='small' />
                        {'   ' + user.journals.length}
                    </Statistic.Value>
                    <Statistic.Label>{user.journals.length > 1 ? 'Journals' : 'Journal'}</Statistic.Label>
                    <Statistic.Label>Written</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>
                        <Icon name='plane' size='small' />
                        {'   ' + uniqueStates.length}
                    </Statistic.Value>
                    <Statistic.Label>{uniqueStates.length > 1 ? 'States' : 'State'}</Statistic.Label>
                    <Statistic.Label>Visited</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>
                        <Icon name='calendar alternate outline' size='small' />
                        {'   ' + avg}
                    </Statistic.Value>
                    <Statistic.Label>Average</Statistic.Label>
                    <Statistic.Label>Trip Length</Statistic.Label>
                </Statistic>

            </Statistic.Group>
        </>

    )
}

export default Profile;