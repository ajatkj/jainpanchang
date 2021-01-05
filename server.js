const express       = require('express')
const mongoose      = require('mongoose')
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const PanchangRouter = require('./routes/panchang')

const connectString = process.env.CONNECTION_STRING
//connection string examples
//'mongodb://localhost:27017/jainpanchang'  // local db
//'mongodb+srv://username:password@clustor0.8yhxn.mongodb.net/jainpanchang' // for mongo-atlas on cloud
mongoose.connect(connectString + '?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
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