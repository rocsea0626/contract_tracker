import * as React from "react";
import {
    Table,
    Navbar,
    Form,
    Button,
    Card
} from 'react-bootstrap';
import './EquipmentsList.css';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getEquipments, setSearchBy, getEquipmentByNumber } from '../../reducers/equipments'
import {LIMIT, EQUIPMENT_NUMBER } from "../../constants/SearchTerms";
import {Error} from "../../components"


export default function EquipmentsList(props) {
    const data = useSelector((state) => state.equipments.data)
    const error = useSelector((state) => state.equipments.error)
    const loading = useSelector((state) => state.equipments.loading)
    const searchBy = useSelector((state) => state.equipments.searchBy)
    const dispatch = useDispatch()

    const inputRef = useRef(searchBy)

    const onSelected = (e) => {
        console.log("onSelected()")
        dispatch(setSearchBy(e.target.value))
    };

    const onClicked = (e) => {
        console.log("onClicked()")
        if(searchBy === LIMIT)
            dispatch(getEquipments(inputRef.current.value))

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

    const renderEquipments = () => {
        return data.map((q, idx) => {
            return (
                <tr key={"key_tr_en_" + idx}>
                    <td key={"key_td_en_" + idx}>
                        {q.EquipmentNumber}
                    </td>
                    <td key={"key_td_addr_" + idx}>
                        {q.Address}
                    </td>
                    <td key={"key_td_sd_" + idx}>
                        {"" + q.StartDate}
                    </td>
                    <td key={"key_td_ed_" + idx}>
                        {"" + q.EndDate}
                    </td>
                    <td key={"key_td_st_" + idx}>
                        {q.Status}
                    </td>
                </tr>
            )
        })
    }

    const renderTable = () => {
      if(error){
          return null
      }
      if(data.length === 0) {
          return (
              <Card>
                  <Card.Header>No data </Card.Header>
              </Card>
          )
      }

      return (
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
              {renderEquipments()}
              </tbody>
          </Table>
      )
    }

    if (loading) {
        return <Spinner animation="border" variant="primary" />
    }

    return (
        <React.Fragment>
            {renderToolbar()}
            <Error/>
            {renderTable()}
        </React.Fragment>
    )
}

