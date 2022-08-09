import axios from 'axios';

let client = undefined

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        // 'X-Api-Key': process.env.REACT_APP_API_KEY
    }
}

const api = axios.create({
    baseURL: process.env.REACT_APP_API_GATEWAY_URL,
    headers: getHeaders()
})

export const getClient = () =>{
    if(!client){
        client = axios.create({
            baseURL: process.env.REACT_APP_API_GATEWAY_URL,
            headers: getHeaders()
        })
    }
}

export function fetchEquipments(limit) {
    const relativePath = 'equipment/search'

    return api.get(
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

    return api.get(
        relativePath,
    )
}