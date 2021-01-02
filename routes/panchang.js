const express = require('express')
const router = express.Router()

const PanchangController = require('../controllers/panchangController')

router.get('/', PanchangController.index)
router.get('/fetchRec/', PanchangController.fetchRec)
router.post('/addRec', PanchangController.addRec)
router.get('/removeRec', PanchangController.removeRec)


module.exports = router