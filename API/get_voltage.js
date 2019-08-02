const Base = require('./basic_queries');

async function readVoltageByYear(device, year) {
    return Base.readVoltage(device, new Date(year, 0, 1), new Date(year + 1, 0, 1))
}

async function readVoltageByMonth(device, year, month) {
    month = month - 1
    return Base.readVoltage(device, new Date(year, month, 1), new Date(year, month + 1, 1));
}

async function readVoltageByDay(device, year, month, day) {
    month = month - 1
    return Base.readVoltage(device, new Date(year, month, day), new Date(year, month, day + 1));
}

//testing
// async function run() {
//     let thisDevice = '0ZJIUN9tYQ'
//
//     var device = await Base.readDevice(thisDevice)
//
//     var a = await readVoltageByYear(device, 2019)
//     console.log('By Year: ')
//     console.log(a)
//     var b = await readVoltageByMonth(device, 2019, 7)
//     console.log('By Month: ')
//     console.log(b)
//     var c = await readVoltageByDay(device, 2019, 7, 25)
//     console.log('By Day: ')
//     console.log(c)
// }
//
// run()
