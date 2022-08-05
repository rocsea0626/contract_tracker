import * as React from "react";
import {Table, Badge, Navbar, Form, FormControl, Button, ButtonGroup, ToggleButton, FormGroup} from 'react-bootstrap';
import './EquipmentsList.css';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { loadEquipments, setSearchBy, getEquipmentByNumber } from '../../reducers/equipments'
import {LIMIT, EQUIPMENT_NUMBER } from "../../constants/SearchTerms";


export default function EquipmentsList(props) {

    const inputRef = useRef(null)

    const data = useSelector((state) => state.equipments.data)
    const loading = useSelector((state) => state.equipments.loading)
    const searchBy = useSelector((state) => state.equipments.searchBy)
    const dispatch = useDispatch()

    const onSelected = (e) => {
        console.log("onSelected()")
        dispatch(setSearchBy(e.target.value))
    };

    const onClicked = (e) => {
        console.log("onClicked()")
        if(searchBy === LIMIT)
            dispatch(loadEquipments(inputRef.current.value))

        if(searchBy === EQUIPMENT_NUMBER)
            dispatch(getEquipmentByNumber(inputRef.current.value))
    }

    const renderToolbar = () => {
        return (
            <Navbar bg="light" expand='sm'>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Col sm="5">
                            <Form.Select defaultValue={searchBy} onChange={(e)=>{onSelected(e)}}>
                                <option value={LIMIT}>Limit</option>
                                <option value={EQUIPMENT_NUMBER}>Equipment Number</option>
                            </Form.Select>
                        </Col>
                        <Col sm="6">
                            <Form.Control
                                type="plaintext"
                                placeholder={searchBy === LIMIT ? 'limit' : 'Equipment Number'}
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
        return data.map((q, idx) => {
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

    if (loading) {
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

