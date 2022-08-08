import axios from 'axios';

let client = undefined

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.REACT_APP_API_KEY
    }
}

export const getClient = () =>{
    if(!client){
        client = axios.create({
            baseURL: process.env.REACT_APP_API_GATEWAY_URL,
            headers: getHeaders()
        })
    }
    return client
}

export function fetchEquipments(limit) {
    const relativePath = 'equipment/search'

    return getClient().get(
        relativePath,
        {
            params: {
                "limit": limit,
            },
        }
    )
}

export function fetchEquipmentByNumber(equipmentNumber) {
    const relativePath = 'equipment/'+equipmentNumber

    return getClient().get(
        relativePath,
    )
}