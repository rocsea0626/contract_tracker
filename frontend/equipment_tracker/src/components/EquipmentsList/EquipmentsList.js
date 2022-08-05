import * as React from "react";
import {Table, Badge, Navbar, Form, FormControl, Button, ButtonGroup, ToggleButton, FormGroup} from 'react-bootstrap';
import './EquipmentsList.css';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useRef } from 'react';

export default function EquipmentsList(props) {

    const selectRef = useRef(null)
    const inputRef = useRef(null)
    const [searchBy, setSearchBy] = useState('equipmentNumber');

    const onSelected = (e) => {
        console.log("onSelected()")
        setSearchBy(e.target.value)
    };

    const onClicked = (e) => {
        console.log("onClicked()")
        console.log(selectRef.current.value)
        console.log(inputRef.current.value)
    }

    const renderToolbar = () => {
        return (
            <Navbar bg="light" expand='sm'>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Col sm="5">
                            <Form.Select defaultValue="equipmentNumber" ref={selectRef} onChange={(e)=>{onSelected(e)}}>
                                <option value="limit">Limit</option>
                                <option value="equipmentNumber">Equipment Number</option>
                            </Form.Select>
                        </Col>
                        <Col sm="6">
                            <Form.Control
                                type="plaintext"
                                placeholder={searchBy === 'limit' ? 'limit' : 'Equipment Number'}
                                ref={inputRef} />
                        </Col>
                        <Col sm="1">
                            <Button variant='outline-info' onClick={(e) => { onClicked(e) }}>Search</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Navbar>
        )
    }

    const renderStocks = () => {
        return props.equipments.map((q, idx) => {
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

    if (props.loading) {
        return <Spinner animation="border" variant="primary" />
    }

    return (
        <React.Fragment>
            {renderToolbar()}
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
                    {renderStocks()}
                </tbody>
            </Table>
        </React.Fragment>
    )
}

