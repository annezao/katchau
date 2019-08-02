const Parse = require('parse/node')

Parse.serverURL = 'https://katchau-dev.back4app.io'
Parse.initialize('H5dcONjNMNy5WTpFt9tXAHdEAeanqT8mlq9HRSPu', 'WPnfXA7fjUYszyhf8SuEkcKR8X0LyRTEL6TrodJZ')

async function createVoltage(device, value, date = new Date()) {
    let Voltage = Parse.Object.extend('Voltage')
    let voltage = new Voltage()

    voltage.set('value', value)
    voltage.set('date', date)
    voltage.set('source', device)

    voltage.save()
}

async function readVoltage(device, start, end = new Date()) {
    const Voltage = Parse.Object.extend('Voltage')
    const query = new Parse.Query(Voltage)

    query.equalTo("source", device)
    query.greaterThanOrEqualTo("date", start)
    query.lessThanOrEqualTo("date", end)
    query.include('value')
    query.include('date')

    var result = await query.find()

    let arr = []

    for(var i = 0; i < result.length; i++) {
        let thisObject = result[i]
        arr.push({'date':thisObject.get('date'), 'value':thisObject.get('value')})
    }

    return arr
}

async function createDevice() {
    let Device = Parse.Object.extend('Device')
    let device = new Device()

    device.save()
}

async function readDevice(id) {
    const Device = Parse.Object.extend('Device')
    const query = new Parse.Query(Device)
    var dev = await query.get(id)
    return dev
}

const Base = {
    createVoltage: createVoltage,
    createDevice: createDevice,
    readVoltage: readVoltage,
    readDevice: readDevice
}

module.exports = Base
