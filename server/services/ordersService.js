const { orders } = require('../models')
const db = require('../models')
const { Op } = require('sequelize')

const GetAllOrders = async () => {
  const allOrders = await orders.findAll({})
  return allOrders
}

const ordersByVaccineName = async (name) => {
  if (!name) {
    return { status: 404, success: false, message: 'Include search params' }
  }

  try {
    const ordersByVaccineName = await orders.findAll({
      where: {
        vaccine: name,
      },
    })

    if (ordersByVaccineName.length <= 0) {
      return {
        status: 404,
        success: false,
        message: 'No orders with given params',
      }
    }
    return { status: 200, success: true, orders: ordersByVaccineName }
  } catch (error) {
    console.log(error)
  }
}

const sumOfOrdersAndVaccinationsPerProd = async (producer, validDate) => {
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
              [Op.lt]: validDate,
            },
          },
          { vaccine: producer },
        ],
      },
    })

    return {
      status: 200,
      success: true,
      date: validDate,
      producer,
      orders: sumOfOrdersAndVaccinationsPerProd,
    }
  } catch (error) {
    console.log(error)
  }
}

const sumOfOrdersAndVaccinations = async (validDate) => {
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
          [Op.lt]: validDate,
        },
      },
    })

    return {
      status: 200,
      success: true,
      date: validDate,
      orders: sumOfOrdersAndVaccinations,
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  GetAllOrders,
  ordersByVaccineName,
  sumOfOrdersAndVaccinationsPerProd,
  sumOfOrdersAndVaccinations,
}
