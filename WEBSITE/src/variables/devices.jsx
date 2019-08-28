
import Parse from 'parse';

async function createDevice() {
    let Device = Parse.Object.extend('Device')
    let device = new Device()

    await device.save()
    return device
}

async function readDevices() {
    let devices = Parse.User.current().get("owner").relation('Monitors').query()
    let result = await devices.find()
    return result
}

async function readDevice(id) {
    const Device = Parse.Object.extend('Device')
    const query = new Parse.Query(Device)
    let device = await query.get(id)
    return device
}

let devices = [
    {
        "_id":"1",
        "name":"minha casa",
        "description":"controlador de geladeira"
    },
    {
        "_id":"2",
        "name":"casa da minha mãe",
        "description":"controlador da sala"
    }
];

export {
    createDevice,
    readDevice,
    readDevices,
    devices
}