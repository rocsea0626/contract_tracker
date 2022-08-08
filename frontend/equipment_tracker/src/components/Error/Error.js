import * as React from "react";
import { Alert } from 'react-bootstrap'
import {useSelector} from "react-redux";


export default function Error() {
    const error = useSelector((state) => state.equipments.error)

    if (error){
        return (
            <Alert key='warning' variant='warning'>
                Status Code:{error.statusCode}. Message: {error.message}
            </Alert>
        )
    }

    return null
}



