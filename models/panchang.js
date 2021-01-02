const mongoose      = require('mongoose')
const Schema        = mongoose.Schema

const panchangSchema = new Schema({
    location: {
        type: String
    },
    phase: { // phase is 'vad' or 'sud'
        type: String
    },
    date: { // date in yyyymmdd format
        type: String
    },
    tithi: { // text
        type: String, lowercase: true
    },
    sunrise: { // time in HH.MM format
        type: String, default: 'na'
    },
    sunset: { // time in HH.MM format
        type: String, default: 'na'
    },
    navkarsi: { // time in HH.MM format
        type: String, default: 'na'
    },
    porsi: { // time in HH.MM format
        type: String, default: 'na'
    },
    sadhporsi: { // time in HH.MM format
        type: String, default: 'na'
    },
    kamlikal_morning: { // time in HH.MM format
        type: String, default: 'na'
    },
    kamlikal_evening: { // time in HH.MM format
        type: String, default: 'na'
    }
})

const Panchang = mongoose.model('JainPanchang', panchangSchema) // create mongodb collection
module.exports = Panchang