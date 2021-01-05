const Panchang = require('../models/panchang')
const moment = require('moment')

// Show the list of employees

const index = (req, res, next) => {
    Panchang.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error has occured!'
        })
    })
}

const fetchRec = (req, res, next) => {
    let location = req.query.location
    let date = req.query.date
    let dateobj = new Date() // today's date
    let today = dateobj.getFullYear() + (dateobj.getMonth() + 1).toString().padStart(2,'0') + dateobj.getDate().toString().padStart(2,'0')
    dateobj.setDate(dateobj.getDate() + 1) // tomorrow
    let tomorrow = dateobj.getFullYear() + (dateobj.getMonth() + 1).toString().padStart(2,'0') + dateobj.getDate().toString().padStart(2,'0')
    dateobj.setDate(dateobj.getDate() + 1) // day after tomorrow
    let dayafter = dateobj.getFullYear() + (dateobj.getMonth() + 1).toString().padStart(2,'0') + dateobj.getDate().toString().padStart(2,'0')
    dateobj.setDate(dateobj.getDate() - 3) // yesterday
    let yesterday = dateobj.getFullYear() + (dateobj.getMonth() + 1).toString().padStart(2,'0') + dateobj.getDate().toString().padStart(2,'0')
    if (date == 'today'){
        date=today
    } else if (date == 'tomorrow'){
        console.log ("here")
        date=tomorrow
    } if (date == 'day-after'){
        date=dayafter
    }
    let relativeDay=''
    // set relative day
    if (date < yesterday) {
        relativeDay='past'
    } else if (date == yesterday){
        relativeDay='yesterday'
    } else if (date == today) {
        relativeDay='today'
    } else if (date == tomorrow){
        relativeDay='tomorrow'
    } else if (date == dayafter) {
        relativeDay='day-after'
    } else {
        relativeDay='future'
    }
    let convDate = new Date(date.substr(0,4), (date.substr(4,2) - 1), date.substr(6,2)) // convert date to Date object to extract the day
    let formattedDate = date.substr(6,2).toString().padStart(2,'0') + '.' + date.substr(4,2).toString().padStart(2,'0') + '.' + date.substr(0,4).toString()
    let dayName = ' '
    switch (convDate.getDay()) {
        case 0: dayName='sun'
        break; 
        case 1: dayName='mon'
        break;
        case 2: dayName='tue'
        break;
        case 3: dayName='wed'
        break
        case 4: dayName='thu'
        break;
        case 5: dayName='fri'
        break;
        case 6: dayName='sat'
        break;
    }
    Panchang.findOne({location: location, date: date}, function(err, response) { 
        if (err) res.json({message: 'Error in fetching data from database'})
        if (response){
            res.json({
                "location": response.location,
                "date": formattedDate,
                "rawDate": date,
                "sunrise": response.sunrise,
                "sunset": response.sunset,
                "navkarsi": response.navkarsi,
                "porsi": response.porsi,
                "sadhporsi": response.sadhporsi,
                "kamlikal_morning": response.kamlikal_morning,
                "kamlikal_evening": response.kamlikal_evening,
                "tithi": response.tithi,
                "phase": response.phase,
                "day": dayName,
                "relativeDay": relativeDay
            })
        } else {
            res.json({message: 'No record found with matching criteria ' + location + ', ' + date})
        }
    })
}

const addRec = (req, res, next) => {
    let location = req.body.location
    let date = req.body.date
    Panchang.findOne({location: location, date: date}, function(err, rec){
        if (err) res.json({message: 'Error in connecting to DB'})
        if (rec){
            res.json({message: 'Panchang record already exists for this location & month'})
        } else {
            let panchangRec = new Panchang({
                location: req.body.location,
                date: req.body.date,
                tithi: req.body.tithi,
                phase: req.body.phase,
                sunrise: req.body.sunrise,
                sunset: req.body.sunset,
                navkarsi: req.body.navkarsi,
                porsi: req.body.porsi,
                sadhporsi: req.body.sadhporsi,
                kamlikal_morning: req.body.kamlikal_morning,
                kamlikal_evening: req.body.kamlikal_evening,
            })
            panchangRec.save()
            .then(response => {
                res.json({
                    message: 'Panchang record added successfully!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occurred in adding record!'
                })
            })
        }
    })    
}

// update en employee
/*const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Employee updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred in updating!'
        })
    })
}*/

// delete an employee

const removeRec = (req, res, next) => {
    let location = req.body.location
    let date = req.body.date
    Panchang.find({location: location, date: date})
    .then(() => {
        res.json({
            message: 'Panchange record deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred in deleting!'
        })
    })
}

module.exports = {
    index, fetchRec, addRec, removeRec
}