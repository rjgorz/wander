import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import UserContext from './Context';

function Nav({ setUser }) {
    const user = useContext(UserContext);
    const [active, setActive] = useState('home');

    function handleItemClick(name) {
        setActive(name);
    }

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" });
        setUser({
            id: 0,
            username: "",
            _password_hash: "",
            journals: [],
            images: [],
            states: []
          });
          console.log(user)
    }


    return (
        <>
            <div>
                <h1>Welcome {user.username}!</h1>
            </div>
            <Menu pointing secondary>
                <Menu.Item
                    as={Link}
                    to='/'
                    name='home'
                    active={active === 'home'}
                    onClick={() => handleItemClick('home')}
                />
                <Menu.Item
                    as={Link}
                    to='/my_journals'
                    name='my journals'
                    active={active === 'my journals'}
                    onClick={() => handleItemClick('my journals')}
                />
                <Menu.Item
                    as={Link}
                    to='/group_journals'
                    name='group journals'
                    active={active === 'group journals'}
                    onClick={() => handleItemClick('group journals')}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        as={Link}
                        to='/'
                        name='logout'
                        active={active === 'logout'}
                        onClick={() => handleLogoutClick()}
                    />
                </Menu.Menu>
            </Menu>
        </>

    )
}

export default Nav;