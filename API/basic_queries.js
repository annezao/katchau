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

    for (var i = 0; i < result.length; i++) {
        let thisObject = result[i]
        arr.push({
            'date': thisObject.get('date'),
            'value': thisObject.get('value')
        })
    }

    return arr
}

// ================= Device

async function createDevice() {
    let Device = Parse.Object.extend('Device')
    let device = new Device()
    device.set('serial', serial)
    await device.save()
    return device
}

async function readDevice(id) {
    const Device = Parse.Object.extend('Device')
    const query = new Parse.Query(Device)
    let device = await query.get(id)
    return device
}
/*
async function updatingDevice(Id, username, email, confirmPassword, owner){
    let Device = Parse.Object.extend('Device')
    const query = new Parse.Query(Device);
  
    let device =  await query.get(Id)
    device.set("something", something)
  
    device.save()

}
*/
async function deleteDevice(Id){
    let Device = Parse.Object.extend('Device')
    const query = new Parse.Query(Device);
  
    let device = query.get(Id)
    device.destroy()
  
}

// ================= Person

async function createPerson(name, lastname, email, cel) {

    let Person = Parse.Object.extend('Person')
    let person = new Person()

    person.set('name', name)
    person.set('lastname', lastname)
    person.set('email', email)
    person.set('cellphone', cel)

    await person.save()

    return person
}

async function readPerson(id) {
    const Person = Parse.Object.extend('Person')
    const query = new Parse.Query(Person)
    let person = await query.get(id)
    return person
}

async function updatingPerson(Id, username, email, confirmPassword, owner) {
    let Person = Parse.Object.extend('Person')
    const query = new Parse.Query(Person);

    let person = await query.get(Id)
    person.set('username', username);
    person.set('email', email);
    person.set('Password', confirmPassword);
    person.set('confirmPassword', confirmPassword);
    person.set('owner', owner);

    person.save()

}

async function deletePerson(Id) {
    let Person = Parse.Object.extend('Person')
    const query = new Parse.Query(Person);

    let person = query.get(Id)
    person.destroy()

}

// ================== User

async function createUser(username, password, confirmPassword, email, owner) {
    const user = new Parse.User();

    user.set('username', username);
    user.set('email', email);
    user.set('confirmPassword', confirmPassword);
    user.set('password', password);
    user.set("owner", owner)

    user.save()

}

async function readUser(Id) {
    const User = new Parse.User();
    const query = new Parse.Query(User)
    let user = await query.get(Id)
    return user
}

async function updatingUser(Id, username, email, confirmPassword, owner) {
    const User = new Parse.User();
    const query = new Parse.Query(User);

    let user = await query.get(Id)
    user.set('username', username);
    user.set('email', email);
    user.set('Password', confirmPassword);
    user.set('confirmPassword', confirmPassword);
    user.set('owner', owner);

    user.save()

}

async function deleteUser(Id) {
    const User = new Parse.User();
    const query = new Parse.Query(User);

    let user = query.get(Id)
    user.destroy()

}
// ================== Address

async function createAddress(street, neighborhood, n, cep, owner) {
    const Address = Parse.Object.extend('Address');
    const address = new Address();

    address.set('street', street);
    address.set('neighborhood', neighborhood);
    address.set('number', n);
    address.set('cep', cep);
    address.set("owner", owner)

    address.save()

}

async function readAdress(Id) {
    const Address = Parse.Object.extend('Address');
    const query = new Parse.Query(Address);
    let address = await query.get(Id)
    return address
}

async function updatingAddress(Id, street, neighborhood, n, cep, owner) {
    let Address = Parse.Object.extend('Address')
    const query = new Parse.Query(Address);

    let address = await query.get(Id)
    address.set('street', street);
    address.set('neighborhood', neighborhood);
    address.set('number', n);
    address.set('cep', cep);
    address.set("owner", owner)

    address.save()

}

async function deleteAddress(Id) {
    let Address = Parse.Object.extend('Address')
    const query = new Parse.Query(Address);

    let address = query.get(Id)
    address.destroy()

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

// ================== Testing Module

async function run() {
    //let Person = await readPerson("40Z7orijSS")
    //createAddress("Terencio Sampaio", "Grageru", "215", "49025-700", user)
    //createUser("anya", "123456", "123456", "email@example.com", Person)
}

run()