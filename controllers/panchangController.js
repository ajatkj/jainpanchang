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
    let dateobj = new Date()
    let today = dateobj.getFullYear() + (dateobj.getMonth() + 1).toString().padStart(2,'0') + dateobj.getDate().toString().padStart(2,'0')
    let tomorrow = dateobj.getFullYear() + (dateobj.getMonth() + 1).toString().padStart(2,'0') + (dateobj.getDate() + 1).toString().padStart(2,'0')
    let dayafter = dateobj.getFullYear() + (dateobj.getMonth() + 1).toString().padStart(2,'0') + (dateobj.getDate() + 2).toString().padStart(2,'0')
    if (date == 'today'){
        date=today
    }
    if (date == 'tomorrow'){
        date=tomorrow
    }
    if (date == 'dayafter'){
        date=tomorrow
    }
    console.log("request parmeters is:"+req.query)
    console.log("location is "+location)
    console.log("date is "+date)
    Panchang.findOne({location: location, date: date}, function(err, response) { 
        if (err) res.json({message: 'Error in fetching data from database'})
        if (response){
            res.json({response})
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