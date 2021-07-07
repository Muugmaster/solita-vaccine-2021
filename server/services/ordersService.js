const { orders } = require('../models')
const db = require('../models')
const { Op } = require('sequelize')

const GetAllOrders = async () => {
  const allOrders = await orders.findAll({})
  return allOrders
}

const ordersByProdName = async (name) => {
  if (!name) {
    return { status: 404, success: false, message: 'Include search params' }
  }

  try {
    const ordersByProdName = await orders.findAll({
      where: {
        vaccine: name,
      },
    })

    return { status: 200, success: true, orders: ordersByProdName }
  } catch (error) {
    console.log(error)
  }
}

const ordersByProdAndDate = async (producer, validDate) => {
  try {
    const sumOfOrdersAndVaccinationsPerProd = await orders.findAll({
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

const ordersBeforeDate = async (validDate) => {
  try {
    const sumOfOrdersAndVaccinations = await orders.findAll({
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

const ordersByDate = async (validDate) => {
  console.log(validDate)
  try {
    const addOneDay = (date) => {
      const dt = new Date(date)
      console.log(dt)
      return dt.setDate(dt.getDate() + 1)
    }
    const sumOfOrdersAndVaccinations = await orders.findAll({
      where: {
        [Op.and]: [
          { arrived: { [Op.gte]: validDate } },
          { arrived: { [Op.lt]: addOneDay(validDate) } },
        ],
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
  ordersByProdName,
  ordersByProdAndDate,
  ordersBeforeDate,
  ordersByDate,
}
