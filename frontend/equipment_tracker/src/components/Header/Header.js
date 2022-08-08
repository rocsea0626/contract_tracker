import * as React from "react";
import { Navbar, Container } from 'react-bootstrap'

class Header extends React.Component {

    render() {
        return (
            <Navbar sticky="top" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        Equipment Tracker
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default Header