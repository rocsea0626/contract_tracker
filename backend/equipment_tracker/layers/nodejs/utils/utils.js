
exports.validateRequest = (event) => {
    console.log("validateRequest(event.body: %s)", event.body)
    if (!event.body.EquipmentNumber || !event.body.Address || !event.body.StartDate || !event.body.EndDate || !event.body.Status){
        return false
    }
    if(event.body.Status !== 'Running' && event.body.Status !== 'Stopped')
        return false
    return true
}