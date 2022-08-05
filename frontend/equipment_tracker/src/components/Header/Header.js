import * as React from "react";
import { Navbar, Container } from 'react-bootstrap'
import './Header.css';

class Header extends React.Component {

    render() {
        return (
            <Navbar sticky="top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        Equipment Tracker
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default Header