import * as AWS from './aws'

const fetchEquipments = (limit) => {
    return AWS.fetchEquipments(limit)
}

const fetchEquipmentByNumber = (equipmentNumber) =>{
    return AWS.fetchEquipmentByNumber(equipmentNumber)
}

export {
    fetchEquipments,
    fetchEquipmentByNumber,
}