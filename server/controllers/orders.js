const ordersRouter = require('express').Router()
const ordersService = require('../services/ordersService')
const validators = require('../utils/validators')

ordersRouter.get('/', async (req, res) => {
  const { arrivedBefore, producer, arrived } = req.query

  // Return orders with given producer name and before arrived date
  if (arrivedBefore && producer) {
    const validDate = validators.validateDate(arrivedBefore)

    if (!validDate) {
      return res.status(404).json({
        success: false,
        message: 'Search param need to be valid date',
      })
    }
    const response = await ordersService.ordersByProdAndDate(
      producer,
      arrivedBefore
    )
    return res.status(response.status).json(response)
  }

  // Return orders before given arrived date
  if (arrivedBefore) {
    const validDate = validators.validateDate(arrivedBefore)

    if (!validDate) {
      return res.status(404).json({
        success: false,
        message: 'Search param need to be valid date',
      })
    }
    const response = await ordersService.ordersBeforeDate(arrivedBefore)
    return res.status(response.status).json(response)
  }

  // Return orders with given producer name
  if (producer) {
    const response = await ordersService.ordersByProdName(producer)
    return res.status(response.status).json(response)
  }

  if (arrived) {
    const response = await ordersService.ordersByDate(arrived)
    return res.status(response.status).json(response)
  }

  // Return all orders
  const allOrders = await ordersService.GetAllOrders()
  return res.status(200).json({ success: true, orders: allOrders })
})

module.exports = ordersRouter
