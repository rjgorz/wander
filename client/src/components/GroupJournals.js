import { useContext } from 'react';
import UserContext from './Context';
import GroupContainer from './GroupContainer';
// import { Grid } from 'semantic-ui-react';

function GroupJournals() {
    const user = useContext(UserContext);

    if (user.groups.length === 0)
        return <h1>You aren't in any groups!</h1>

    const groupSet = user.groups.map(group => {
        return <GroupContainer key={group.id} group={group} />
    })

    return (
        <div className='group-container'>
            {groupSet}
        </div>
    )
}

export default GroupJournals;