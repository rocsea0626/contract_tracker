const faker = require('@faker-js/faker').faker
const fs = require("fs")
const path = require("path")
const AWS = require('aws-sdk')
const generateEquipments = (amount) => {
    console.log("generateEquipments(amount: %d)", amount)
    const equipments = []
    for (let i = 0; i<amount; i++){
        equipments.push({
            EquipmentNumber: faker.random.alphaNumeric(10),
            Address: faker.address.streetAddress(),
            StartDate: faker.date.past().toISOString(),
            EndDate: faker.date.future().toISOString(),
            Status: Math.ceil(Math.random() * 10) % 2 === 0 ? "Running" : "Stopped",
        })
    }
    // console.log(equipments)
    return equipments
}

const generateDynamodbInputFile = (equipments) => {
    const dataSet = []

    equipments.forEach((equipment, idx)=>{
        if (idx % 25 === 0){
            dataSet.push({
                RequestItems: {
                    EquipmentsTable: []
                }
            })
        }

        dataSet[Math.floor(idx / 25)].RequestItems.EquipmentsTable.push({
            PutRequest:{
                Item:{
                    "EquipmentNumber": equipment.EquipmentNumber,
                    "Address": equipment.Address,
                    "StartDate": equipment.StartDate,
                    "EndDate": equipment.EndDate,
                    "Status": equipment.Status
                }
            }
        })
    })
    return dataSet
}

const writeToFile = (filename, data) => {
    try {
        fs.writeFileSync(path.resolve(filename), JSON.stringify(data));
    } catch (err) {
        throw err
    }
}

const batchWriteToDynamodb = async (dataSet) => {

    const client = new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION})
    return dataSet.forEach(async (data)=>{
        await client.batchWrite(data).promise()
    })
}

(async () => {
    try {
        console.log("Uploading data into Dynamodb...")
        const equipments = generateEquipments(process.env.AMOUNT)
        const data = generateDynamodbInputFile(equipments)
        await batchWriteToDynamodb(data)
        console.log("Uploading complete")
    } catch (e) {
        throw e
    }
})();


