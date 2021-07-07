const { vaccinations, orders } = require('../models')
const db = require('../models')
const { Op } = require('sequelize')

const countExpiredVaccinations = (
  arrOfExpiredOrders,
  arrOfExpiredVaccinations
) => {
  let sumOfInjections = 0
  for (i = 0; i < arrOfExpiredOrders.length; i++) {
    sumOfInjections += arrOfExpiredOrders[i].dataValues.injections
  }

  return sumOfInjections - arrOfExpiredVaccinations.length
}

const expiredVaccines = async (date) => {
  try {
    const expiredOrders = await orders.findAll({
      where: {
        arrived: {
          [Op.lt]: db.Sequelize.literal(
            `(timestamp '${date}' - interval '30' day)`
          ),
        },
      },
    })

    const expiredVaccinations = await vaccinations.findAll({
      where: {
        vaccinationDate: {
          [Op.lt]: db.Sequelize.literal(
            `(timestamp '${date}' - interval '30' day)`
          ),
        },
      },
    })

    const sumOfExpired = countExpiredVaccinations(
      expiredOrders,
      expiredVaccinations
    )

    return {
      success: true,
      status: 200,
      expired_amount: sumOfExpired,
      orders: expiredOrders,
      vaccinations: expiredVaccinations,
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { countExpiredVaccinations, expiredVaccines }
