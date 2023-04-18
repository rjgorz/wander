import React, { useState, useContext, createRef } from "react";
import { Link } from "react-router-dom";
import { Menu, Header, Sticky } from "semantic-ui-react";
import UserContext from './Context';

function Nav({ setUser }) {
    const user = useContext(UserContext);
    const [active, setActive] = useState('map');

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
    }

    const style = {
        'marginBottom': '2rem'
    }

    return (
        <div className='nav-bar'>
            <div>
                <Header>
                    <div id='title'>Wander</div>
                    <br />
                    <Header.Subheader>
                        Welcome {user.first_name + ' ' + user.last_name}!
                    </Header.Subheader>
                </Header>
            </div>
            <Sticky>
                <Menu pointing secondary style={style}>
                    <Menu.Item link
                        as={Link}
                        to='/'
                        name='map'
                        active={active === 'map'}
                        onClick={() => handleItemClick('map')}
                    />
                    <Menu.Item link
                        as={Link}
                        to='/my_journals'
                        name='my journals'
                        active={active === 'my journals'}
                        onClick={() => handleItemClick('my journals')}
                    />
                    <Menu.Item link
                        as={Link}
                        to='/images'
                        name='images'
                        active={active === 'images'}
                        onClick={() => handleItemClick('images')}
                    />
                    <Menu.Item link
                        as={Link}
                        to='/group_journals'
                        name='group journals'
                        active={active === 'group journals'}
                        onClick={() => handleItemClick('group journals')}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item link
                            as={Link}
                            to='/profile'
                            name='profile'
                            active={active === 'profile'}
                            onClick={() => handleItemClick('profile')}
                        />
                        <Menu.Item link
                            as={Link}
                            to='/'
                            name='logout'
                            active={active === 'logout'}
                            onClick={() => handleLogoutClick()}
                        />
                    </Menu.Menu>
                </Menu>
            </Sticky>
        </div>

    )
}

export default Nav;