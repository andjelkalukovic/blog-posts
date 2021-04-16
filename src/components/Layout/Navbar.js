import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
//import decode from 'jwt-decode'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Logo from '../../images/logo192.png'
import { LOGOUT } from '../../constants/actionTypes';

const Navigation = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        //const token = user.token;
        //console.log(token)
        // if (token) {
        //     const decodedToken = decode(token);
        //     if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        // }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const handleLogout = () => {
        localStorage.removeItem('profile')
        localStorage.clear()
        dispatch({ type: LOGOUT })
        history.push('/');
        setUser(null);
        window.location.reload();
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"><img src={Logo} alt='Blog logo'
                    style={{ width: '35px', height: '35px' }} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ml-auto">
                        {user ? <>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href='/' onClick={handleLogout}>Logout</Nav.Link>
                        </> : <>
                                <Nav.Link href='/'>Log In</Nav.Link>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
