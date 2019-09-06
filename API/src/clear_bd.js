const Parse = require("parse/node");

/*
Parse.serverURL = "https://katchau-dev.back4app.io";
Parse.initialize(
  "H5dcONjNMNy5WTpFt9tXAHdEAeanqT8mlq9HRSPu",
  "WPnfXA7fjUYszyhf8SuEkcKR8X0LyRTEL6TrodJZ"
);
*/

Parse.serverURL = "https://katchau.back4app.io";
Parse.initialize(
  "PVBDcZz4pgQKtd4ENcNb4cfMEx4lnNybkR7zGkdf",
  "S9taD9jpvpUbdXqeoPFPoxhU23QpFGNt2lyPADDu"
);

async function clearVoltage() {
    let Voltage = Parse.Object.extend("Voltage");
    const query = new Parse.Query(Voltage);

    n = await query.count();

    await query.each(function(voltage){voltage.destroy();});

    console.log(n + " Voltages deleted");
}

async function clearConfig() {
    let Config = Parse.Object.extend("Config");
    const query = new Parse.Query(Config);

    n = await query.count();

    await query.each(function(object){object.destroy();});

    console.log(n + " Configs deleted");
}

async function clearPerson() {
    let Person = Parse.Object.extend("Person");
    const query = new Parse.Query(Person);

    n = await query.count();

    await query.each(function(object){object.destroy();});

    console.log(n + " Persons deleted");
}

async function clearDevice() {
    let Device = Parse.Object.extend("Device");
    const query = new Parse.Query(Device);

    n = await query.count();

    await query.each(function(object){object.destroy();});

    console.log(n + " Devices deleted");
}

async function clearAddress() {
    let Address = Parse.Object.extend("Address");
    const query = new Parse.Query(Address);

    n = await query.count();

    await query.each(function(object){object.destroy();});

    console.log(n + " Addresses deleted");
}

// async function clearSession() {
//     let Session = new Parse.Session();
//     const query = new Parse.Query(Session);
//
//     n = await query.count();
//
//     await query.each(function(object){object.destroy();});
//
//     console.log(n + " Sessions deleted");
// }
//
// async function clearUser() {
//     let User = new Parse.User();
//     const query = new Parse.Query(User);
//
//     n = await query.count();
//
//     await query.each(function(object){object.destroy();});
//
//     console.log(n + " Users deleted");
// }
//
// async function clearRole() {
//     const Role = new Parse.Role();
//     const query = new Parse.Query(Role);
//
//     n = await query.count();
//
//     await query.each(function(object){object.destroy();});
//
//     console.log(n + " Roles deleted");
// }

async function run()
{
    clearVoltage();
    clearConfig();
    clearUser();
    clearSession();
    clearPerson();
    clearAddress();
    clearDevice();
    clearRole();
}

run()
