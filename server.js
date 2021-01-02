const express       = require('express')
const mongoose      = require('mongoose')
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const PanchangRouter = require('./routes/panchang')

//mongoose.connect('mongodb://localhost:27017/jainpanchang',{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb+srv://ajatkj:ajatkj@clustor0.8yhxn.mongodb.net/jainpanchang?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
console.log('Testing')
db.on('error', (err) => {
    console.log(err)
})

db.once('open',()=> {
    console.log('DB connection established!')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5006

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/jainpanchang',PanchangRouter)