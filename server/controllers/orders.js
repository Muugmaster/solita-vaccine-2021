const ordersRouter = require('express').Router()
const { orders } = require('../models')

ordersRouter.get('/', async (req, res) => {
  try {
    const allOrders = await orders.findAll({})
    return res.status(200).json({ success: true, orders: allOrders })
  } catch (error) {
    console.log(error)
  }
})

ordersRouter.get('/vaccine', async (req, res) => {
  const { name } = req.query

  if (!name) {
    return res
      .status(404)
      .json({ success: false, message: 'Include search params' })
  }

  try {
    const ordersByVaccineName = await orders.findAll({
      where: {
        vaccine: name,
      },
    })

    if (ordersByVaccineName.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No orders with given params' })
    }
    return res.status(200).json({ success: true, orders: ordersByVaccineName })
  } catch (error) {
    console.log(error)
  }
})

module.exports = ordersRouter
