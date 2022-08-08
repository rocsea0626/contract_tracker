import * as React from "react";
import { Navbar, Container } from "react-bootstrap"
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <Navbar fixed="bottom" bg='light'>
                <Container fluid>
                    <Navbar.Brand className="text-center">Guo Haipeng, CopyRight@{new Date().getFullYear()}</Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default Footer