const vaccinationsRouter = require('express').Router()
const { vaccinations } = require('../models')
const db = require('../models')
const { Op } = require('sequelize')
const validators = require('../utils/validators')

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

// How many of the vaccinations have been used for given day
vaccinationsRouter.get('/used', async (req, res) => {
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

  try {
    const allUsedVaccinations = await vaccinations.findAll({
      attributes: [
        [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'used_vaccinations'],
      ],
      where: {
        vaccinationDate: {
          [Op.lt]: date,
        },
      },
    })
    return res
      .status(200)
      .json({ success: true, vaccinations: allUsedVaccinations })
  } catch (error) {
    console.log(error)
  }
})

module.exports = vaccinationsRouter
