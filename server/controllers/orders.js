const ordersRouter = require('express').Router()
const { orders } = require('../models')
const db = require('../models')
const { Op } = require('sequelize')

// Get all orders
ordersRouter.get('/', async (req, res) => {
  try {
    const allOrders = await orders.findAll({})
    return res.status(200).json({ success: true, orders: allOrders })
  } catch (error) {
    console.log(error)
  }
})

// Get orders by name of the vaccine
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

// How many orders and vaccines have arrived total on given day?
// How many orders/vaccines per producer?

ordersRouter.get('/arrived', async (req, res) => {
  const { date, producer } = req.query
  console.log(date, producer)

  if (!date) {
    return res
      .status(404)
      .json({ success: false, message: 'Include search params' })
  }

  let formattedDate
  try {
    formattedDate = new Date(date)
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: 'Search param need to be valid date' })
  }

  if (date && producer) {
    try {
      const sumOfOrdersAndVaccinationsPerProd = await orders.findAll({
        attributes: [
          [
            db.sequelize.fn('SUM', db.sequelize.col('injections')),
            'total_injections',
          ],
          [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'total_orders'],
        ],
        where: {
          [Op.and]: [
            {
              arrived: {
                [Op.lt]: formattedDate,
              },
            },
            { vaccine: producer },
          ],
        },
      })

      return res.status(200).json({
        success: true,
        date: formattedDate,
        producer,
        orders: sumOfOrdersAndVaccinationsPerProd,
      })
    } catch (error) {
      console.log(error)
    }
  }

  try {
    const sumOfOrdersAndVaccinations = await orders.findAll({
      attributes: [
        [
          db.sequelize.fn('SUM', db.sequelize.col('injections')),
          'total_injections',
        ],
        [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'total_orders'],
      ],
      where: {
        arrived: {
          [Op.lt]: formattedDate,
        },
      },
    })

    return res.status(200).json({
      success: true,
      date: formattedDate,
      orders: sumOfOrdersAndVaccinations,
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = ordersRouter
