import { useContext } from "react";
import UserContainer from "./UserContainer";
import UserContext from './Context';

function GroupContainer({ group }) {
    const user = useContext(UserContext);

    const groupUsers = group.users.map(groupUser => {
        if (groupUser.id !== user.id)
            return <UserContainer key={groupUser.id} groupUser={groupUser} />
        else if (groupUser.id === user.id)
            return null
        else
            return <h2>No Entries!</h2>

    })
    return (
        <div className='group_col'>
            <h1>{group.group_name}</h1>
            {groupUsers}
        </div>
    )
}

export default GroupContainer;