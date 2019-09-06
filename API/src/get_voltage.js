const Base = require('./basic_queries')

async function readVoltageByYear(device, year) {
    return Base.readVoltage(device, new Date(year, 0, 1), new Date(year + 1, 0, 1))
}

async function readVoltageByMonth(device, year, month) {
    month = month - 1
    return Base.readVoltage(device, new Date(year, month, 1), new Date(year, month + 1, 1))
}

async function readVoltageByDay(device, year, month, day) {
    month = month - 1
    return Base.readVoltage(device, new Date(year, month, day), new Date(year, month, day + 1))
}

async function readVoltageFromHour(device, year, month, day, hour) {
    month = month - 1
    return Base.readVoltage(device, new Date(year, month, day, hour), new Date(year, month, day + 1))
}
