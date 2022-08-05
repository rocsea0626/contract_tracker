import * as React from "react";
import { Navbar, Nav } from 'react-bootstrap'
import './Header.css';

class Header extends React.Component {

    render() {
        return (
            <Navbar sticky="top" bg="light">
                <Navbar.Brand>
                    <Nav.Link href="/home">Equipment Tracker</Nav.Link>
                </Navbar.Brand>
            </Navbar>
        )
    }
}

export default Header