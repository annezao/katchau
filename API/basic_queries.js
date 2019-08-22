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

// ================= Config

async function createConfig(user, notificar_email = true, notificar_push = true, vibrate = true,
    som = true, intervalo_notificar = 2) {
    let Config = Parse.Object.extend('Config')
    let config = new Config()

    config.set ('user', user)
    config.set('notificar_email', notificar_email)
    config.set('notificar_push', notificar_push)
    config.set('vibrate', vibrate)
    config.set('som', som)
    config.set('intervalo_notificar', intervalo_notificar)

    await config.save()
}

async function readConfig(id) {
    const Config = Parse.Object.extend('Config')
    const query = new Parse.Query(Config)
    let device = await query.get(id)
    return device
}

async function updatingConfig(notificar_email, notificar_push, vibrate, som, intervalo_notificar) {
    let Config = Parse.Object.extend('Config')
    const query = new Parse.Query(Config);

    let config = await query.get(Id)
    config.set('notificar_email', notificar_email)
    config.set('notificar_push', notificar_push)
    config.set('vibrate', vibrate)
    config.set('som', som)
    config.set('intervalo_notificar', intervalo_notificar)

    await config.save()

}


async function deleteConfig(Id) {
    let Config = Parse.Object.extend('Config')
    const query = new Parse.Query(Config);

    let config = query.get(Id)
    await config.destroy()
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
async function deleteDevice(Id) {
    let Device = Parse.Object.extend('Device')
    const query = new Parse.Query(Device);

    let device = query.get(Id)
    await device.destroy()

}

// ================= Person

async function createPerson(name, lastname, email, cel) {

    let Person = Parse.Object.extend('Person')
    let person = new Person()

    person.set('name', name)
    person.set('lastname', lastname)
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

async function updatingPerson(Id, name, lastname, email, cel) {
    let Person = Parse.Object.extend('Person')
    const query = new Parse.Query(Person);

    let person = await query.get(Id)
    person.set('name', name)
    person.set('lastname', lastname)
    person.set('cellphone', cel)

    await person.save()

}

async function deletePerson(Id) {
    let Person = Parse.Object.extend('Person')
    const query = new Parse.Query(Person);

    let person = query.get(Id)
    await person.destroy()

}

// ================== User

async function createUser(username, password, confirmPassword, email, owner) {
    const user = new Parse.User();

    user.set('username', username);
    user.set('email', email);
    user.set('confirmPassword', confirmPassword);
    user.set('password', password);
    user.set("owner", owner);
    await user.save()

}

async function readUser(Id) {
    const User = new Parse.User();
    const query = new Parse.Query(User)
    let user = await query.get(Id)
    return user
}

async function updatingUser(Id, username, password, confirmPassword, email, owner) {
    const User = new Parse.User();
    const query = new Parse.Query(User);

    let user = await query.get(Id)
    user.set('username', username);
    user.set('email', email);
    user.set('Password', password);
    user.set('confirmPassword', confirmPassword);
    user.set('owner', owner);

    await user.save()

}

async function deleteUser(Id) {
    const User = new Parse.User();
    const query = new Parse.Query(User);

    let user = query.get(Id)
    await user.destroy()

}

// ================== User management

async function createRole(Role, PublicReadAccess, PublicWriteAccess) {
    let myACL = new Parse.ACL()
    myACL.setPublicReadAccess(PublicReadAccess)
    myACL.setPublicWriteAccess(PublicWriteAccess)

    let myRole = new Parse.Role(Role, myACL)
    myRole.save()
}

async function setRole(user, Role) {
    if (user) {
        let rolesQuery = new Parse.Query(Parse.Role)
        rolesQuery.equalTo('name', Role)
        let role = await rolesQuery.first()

        if (role) {
            role.getUsers.add(user)
            role.save()
        }
    }
}

async function _logIn(user, password) {
    let user = await Parse.User.logIn(user, password)
}

async function _logOut(user) {
    if (user) {
        Parse.User.enableUnsafeCurrentUser()
        user = await Parse.User.logOut()
        console.log('User logged out')
    }
}

async function _requestPasswordReset(user, email) {
    if (user) {
        await Parse.User.requestPasswordReset(email)
    }
}

//async function _l


// ================== Address

async function createAddress(street, neighborhood, n, cep, owner) {
    const Address = Parse.Object.extend('Address');
    const address = new Address();

    address.set('street', street);
    address.set('neighborhood', neighborhood);
    address.set('number', n);
    address.set('cep', cep);
    address.set("owner", owner)

    await address.save()

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

    await address.save()

}

async function deleteAddress(Id) {
    let Address = Parse.Object.extend('Address')
    const query = new Parse.Query(Address);

    let address = query.get(Id)
    await address.destroy()

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
    //createPerson("Valente", "Rodrigues", "3131313131");
    let Person = await readPerson("VV7PFqaltk")
   // createUser("ant", "123456", "123456", "email10@example.com", Person);
    //createAddress("Terencio Sampaio", "Grageru", "111", "49020-700", Person.id)
    let User = await readUser("sAFx7sQSj1")
    createConfig(User)
}

run()