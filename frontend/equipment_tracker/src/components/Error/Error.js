import * as React from "react";
import { Jumbotron, Container } from 'react-bootstrap'


class Error extends React.Component {
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h3>{this.props.error.name}</h3>
                    <p>{this.props.error.message}</p>
                </Container>
            </Jumbotron>
        )
    }

}

export default Error
