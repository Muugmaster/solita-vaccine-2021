const vaccinationsRouter = require('express').Router()
const { vaccinations } = require('../models')

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

module.exports = vaccinationsRouter
