const ordersRouter = require('express').Router()
const ordersService = require('../services/ordersService')
const validators = require('../utils/validators')

// Get all orders
ordersRouter.get('/', async (req, res) => {
  try {
    const allOrders = await ordersService.GetAllOrders()
    return res.status(200).json({ success: true, orders: allOrders })
  } catch (error) {
    console.log(error)
  }
})

// Get orders by name of the vaccine
ordersRouter.get('/vaccine', async (req, res) => {
  const { name } = req.query

  const response = await ordersService.ordersByVaccineName(name)

  return res.status(response.status).json(response)
})

// How many orders and vaccines have arrived total on given day?
// How many orders/vaccines per producer?

ordersRouter.get('/arrived', async (req, res) => {
  const { date, producer } = req.query

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

  if (date && producer) {
    const response = await ordersService.sumOfOrdersAndVaccinationsPerProd(
      producer,
      date
    )
    return res.status(response.status).json(response)
  }

  const response = await ordersService.sumOfOrdersAndVaccinations(date)
  return res.status(response.status).json(response)
})

module.exports = ordersRouter
