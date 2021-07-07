const vaccinationsRouter = require('express').Router()
const { vaccinations, orders } = require('../models')
const db = require('../models')
const { Op } = require('sequelize')
const validators = require('../utils/validators')
const vaccinationsService = require('../services/vaccinationsService')

// Get all vaccination data
vaccinationsRouter.get('/', async (req, res) => {
  try {
    const allVaccinations = await vaccinations.findAll({})
    return res
      .status(200)
      .json({ success: true, vaccinations: allVaccinations })
  } catch (error) {
    console.log(error)
  }
})

// How many vaccines expired before the usage -> remember to decrease used injections from the expired bottle
vaccinationsRouter.get('/expired', async (req, res) => {
  const { date } = req.query

  if (!date) {
    return res
      .status(404)
      .json({ success: false, message: 'Include search params' })
  }

  const validDate = validators.validateDate(date)

  if (!validDate) {
    return res
      .status(404)
      .json({ success: false, message: 'Search param need to be valid date' })
  }

  const response = await vaccinationsService.expiredVaccines(date)
  return res.status(response.status).json(response)
})

module.exports = vaccinationsRouter
