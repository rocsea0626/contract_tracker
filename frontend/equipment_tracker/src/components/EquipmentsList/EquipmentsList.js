import * as React from "react";
import {Table, Badge, Navbar, Form, FormControl, Button, ButtonGroup, ToggleButton, FormGroup} from 'react-bootstrap';
import './EquipmentsList.css';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class EquipmentsList extends React.Component {

    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.selectRef = React.createRef()
    }

    onAddClicked = () => {
        console.log("onAddClicked()")
        console.log("this.inputRef: %s, this.selectRef: %s", this.inputRef.current.value, this.selectRef.current.value)
    }

    renderToolbar = () => {
        return (
            <Navbar bg="light" expand='sm'>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Col sm="5">
                            <Form.Select ref={this.selectRef} >
                                <option value="limit">Limit</option>
                                <option value="equipmentNumber">Equipment Number</option>
                            </Form.Select>
                        </Col>
                        <Col sm="6">
                            <Form.Control
                                type="plaintext"
                                placeholder="limit"
                                ref={this.inputRef} />
                        </Col>
                        <Col sm="1">
                            <Button variant='outline-info' onClick={(e) => { this.onAddClicked(e) }}>Search</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Navbar>
        )
    }

    renderStocks = () => {
        return this.props.equipments.map((q, idx) => {
            return (
                <tr key={idx}>
                    <td>
                        {q.EquipmentNumber}
                    </td>
                    <td>{q.Address}</td>
                    <td>
                        {q.StartDate}
                    </td>
                    <td>
                        {q.EndDate}
                    </td>
                    <td>
                        {q.Status}
                    </td>
                </tr>
            )
        })
    }

    render() {
        if (this.props.loading) {
            return <Spinner animation="border" variant="primary" />
        }

        return (
            <React.Fragment>
                {this.renderToolbar()}
                <Table responsive="sm" hover="true">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Address</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStocks()}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}

export default EquipmentsList

