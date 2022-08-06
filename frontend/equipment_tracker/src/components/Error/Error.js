import * as React from "react";
import { Card } from 'react-bootstrap'
import {useSelector} from "react-redux";


export default function Error() {
    const error = useSelector((state) => state.equipments.error)

    if (error){
        return (
            <Card>
                <Card.Header>Error: </Card.Header>
                <Card.Body>Status Code:{error.statusCode}</Card.Body>
                <Card.Body>Message: {error.message}</Card.Body>
            </Card>
        )
    }

    return null
}



