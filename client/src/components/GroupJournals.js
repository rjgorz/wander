import React, { useContext } from 'react';

import UserContext from './Context';
import GroupContainer from './GroupContainer';
import GroupJournalEntry from './GroupJournalEntry';

function GroupJournals() {
    const user = useContext(UserContext);

    // let allGroupJournals = [];

    // for (const group of user.groups) {
    //     const groupHeader = <h1 key={group.id}>{group.group_name}:</h1>;
    //     allGroupJournals.push(groupHeader);
    //     if (group.users.length > 1) {
    //         for (const groupUser of group.users) {
    //             const groupUserJournals = groupUser.journals.map(journal => {
    //                 if (journal.user_id !== user.id)
    //                     return <GroupJournalEntry key={journal.id} journal={journal} groupUser={groupUser} />;
    //             });
    //             allGroupJournals.push(groupUserJournals);
    //         }
    //     } else {
    //         const noJournals = <h3><em>No Group Member Journals Written!</em></h3>;
    //         allGroupJournals.push(noJournals);
    //     }
    // }

    const groupSet = user.groups.map(group => {
        return <GroupContainer key={group.id} group={group} />
    })

    return (
        <>
            {groupSet}
        </>
    )
}

export default GroupJournals;