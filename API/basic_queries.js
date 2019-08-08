const Parse = require('parse/node')

Parse.serverURL = 'https://katchau-dev.back4app.io'
Parse.initialize('H5dcONjNMNy5WTpFt9tXAHdEAeanqT8mlq9HRSPu', 'WPnfXA7fjUYszyhf8SuEkcKR8X0LyRTEL6TrodJZ')

// ================= Voltage

async function createVoltage(device, value, date = new Date()) {
    let Voltage = Parse.Object.extend('Voltage')
    let voltage = new Voltage()

    voltage.set('value', value)
    voltage.set('date', date)
    voltage.set('source', device)

    await voltage.save()
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

// ================= Device

async function createDevice() {
    let Device = Parse.Object.extend('Device')
    let device = new Device()

    await device.save()
    return device
}

async function readDevice(id) {
    const Device = Parse.Object.extend('Device')
    const query = new Parse.Query(Device)
    let device = await query.get(id)
    return device
}

// ================= Person

async function createPerson(name, lastname, email, cel){

    let Person = Parse.Object.extend('Person')
    let person = new Person()

    person.set('name', name)
    person.set('lastname', lastname)
    person.set('email', email)
    person.set('cellphone', cel)

    await person.save()

    return person
}

async function readPerson(id){
    const Person = Parse.Object.extend('Person')
    const query = new Parse.Query(Person)
    let person = await query.get(id)
    return person
}

// ================== Monitoring

async function createMonitoring(person, device) {
    let relation = person.relation('monitors')
    relation.add(device)
    await person.save()
}

async function readMonitoring(person) {
    let devices = person.relation('monitors').query()
    let result = await devices.find()
    return result
}

async function deleteMonitoring(person, device) {
    let relation = person.relation('monitors')
    relation.remove(device)
    await person.save()
}

// ================== Export

const Base = {
    createVoltage: createVoltage,
    readVoltage: readVoltage,
    createDevice: createDevice,
    readDevice: readDevice,
    createPerson: createPerson,
    readPerson: readPerson,
    createMonitoring: createMonitoring,
    readMonitoring: readMonitoring,
    deleteMonitoring: deleteMonitoring,
}

module.exports = Base
