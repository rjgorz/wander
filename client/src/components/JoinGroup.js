import { useState, useContext } from 'react';
import UserContext from './Context';
import { Dropdown, Button } from 'semantic-ui-react';

function JoinGroup({ groups, setRefresh, setShowJoin }) {
    const [menuSelection, setSelection] = useState("");
    const user = useContext(UserContext);

    const filteredGroups = groups.filter(masterGroup => user.groups.every(filterGroup => filterGroup.id !== masterGroup.id));

    const groupChoices = filteredGroups.map(group => {
        return {
            key: group.group_name,
            text: group.group_name,
            value: group.group_name
        }
    });

    function getGroup(e) {
        let groupName = e.target.textContent
        setSelection(groupName);
    }

    function getGroupId(findGroup) {
        return groups.filter(group => group.group_name === findGroup)[0].id;
    }

    function handleSubmit() {
        fetch('/user_groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user.id,
                group_id: getGroupId(menuSelection)
            })
        }).then((res) => {
            if (res.ok) {
                res.json().then(() => {
                    setRefresh(prev => !prev);
                    setShowJoin(false);
                })
            }
        })
    }

    return (
        <>
            <strong>Groups:</strong>
            <br />
            <Dropdown
                placeholder='Select a Group...'
                selection
                scrolling
                options={groupChoices}
                onChange={getGroup}
            />
            <br />
            <br />
            <Button onClick={handleSubmit}>Join!</Button>
        </>

    )
}

export default JoinGroup;