import React, { useContext } from 'react';
import UserContext from './Context';
import GroupJournalEntry from './GroupJournalEntry';

function UserContainer({ groupUser }) {
    const user = useContext(UserContext);

    // const entries = groupUser.journals.map(journal => {
    //     if (journal.user_id !== user.id)
    //         return <GroupJournalEntry key={journal.id} journal={journal} groupUser={groupUser} />;
    //     else
    //         return;
    // })

    const entries = []
    for (const journal of groupUser.journals) {
        if (journal.user_id !== user.id && groupUser.journals.length > 0) {
            const entry = <GroupJournalEntry key={journal.id} journal={journal} groupUser={groupUser} />
            entries.push(entry);
        }
    }

    console.log(entries)

    return (
        <>
            {groupUser.id !== user.id ? <h3>{groupUser.first_name + ' ' + groupUser.last_name}</h3> : null}
            {entries}
        </>
    )
}

export default UserContainer;