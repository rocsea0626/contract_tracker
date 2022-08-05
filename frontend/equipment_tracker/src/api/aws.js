import axios from 'axios';
import { API } from './constants'

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        // 'x-api-key': process.env.REACT_APP_API_KEY
    }
}

export function fetchEquipments(limit) {
    const relativePath = 'equipment/search'

    return axios.get(
        API.aws.baseUrl + relativePath,
        {
            params: {
                "limit": limit,
            },
            headers: getHeaders()
        }
    )
}

export function fetchEquipmentByNumber(equipmentNumber) {
    const relativePath = 'equipment/'+equipmentNumber

    return axios.get(
        API.aws.baseUrl + relativePath,
        {
            headers: getHeaders()
        }
    )
}