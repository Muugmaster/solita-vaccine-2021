const db = require('../../models')
const supertest = require('supertest')
const app = require('../../app')

const api = supertest(app)

describe('orders controller', () => {
  test('orders are returned as json', async () => {
    await api
      .get('/api/orders')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is 5000 orders', async () => {
    const response = await api.get('/api/orders')

    expect(response.body.orders).toHaveLength(5000)
  })

  test('return orders by name of vaccine', async () => {
    const zerpfy = await api.get('/api/orders/vaccine?name=Zerpfy')
    const antiqua = await api.get('/api/orders/vaccine?name=Antiqua')
    const solarBuddhica = await api.get(
      '/api/orders/vaccine?name=SolarBuddhica'
    )

    expect(zerpfy.body.orders).toHaveLength(1663)
    expect(antiqua.body.orders).toHaveLength(1661)
    expect(solarBuddhica.body.orders).toHaveLength(1676)
  })

  test('return how many orders and vaccines have arrived total on given day "2021-01-10T11:10:06.473587Z"', async () => {
    const response = await api.get(
      '/api/orders/arrived?date=2021-01-10T11:10:06.473587Z'
    )

    expect(response.body.orders[0].total_injections).toBe('1995')
    expect(response.body.orders[0].total_orders).toBe('396')
  })

  test('return how many orders/vaccines per producer and give day "2021-03-28T11:10:06.473587Z"', async () => {
    const zerpfy = await api.get(
      '/api/orders/arrived?date=2021-03-28T11:10:06.473587Z&producer=Zerpfy'
    )

    expect(zerpfy.body.producer).toBe('Zerpfy')
    expect(zerpfy.body.orders[0].total_injections).toBe('7110')
    expect(zerpfy.body.orders[0].total_orders).toBe('1422')
  })

  afterAll(() => {
    db.sequelize.close()
  })
})
