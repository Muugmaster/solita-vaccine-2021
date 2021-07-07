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

  test('return orders by name of producer', async () => {
    const zerpfy = await api.get('/api/orders/?producer=Zerpfy')
    const antiqua = await api.get('/api/orders/?producer=Antiqua')
    const solarBuddhica = await api.get('/api/orders?producer=SolarBuddhica')

    expect(zerpfy.body.orders).toHaveLength(1663)
    expect(antiqua.body.orders).toHaveLength(1661)
    expect(solarBuddhica.body.orders).toHaveLength(1676)
  })

  test('return orders arrived before given date "2021-01-10T11:10:06.473587Z"', async () => {
    const response = await api.get(
      '/api/orders/?arrivedBefore=2021-01-10T11:10:06.473587Z'
    )

    expect(response.body.orders).toHaveLength(396)
  })

  test('return orders arrived before given date "2021-03-28T11:10:06.473587Z" and given producer "Zerpfy"', async () => {
    const zerpfy = await api.get(
      '/api/orders/?arrivedBefore=2021-03-28T11:10:06.473587Z&producer=Zerpfy'
    )

    expect(zerpfy.body.producer).toBe('Zerpfy')
    expect(zerpfy.body.orders).toHaveLength(1422)
  })

  test('return orders arrived on given date "2021-03-20T00:00:00.000Z"', async () => {
    const response = await api.get(
      '/api/orders/?arrived=2021-03-20T00:00:00.000Z'
    )

    expect(response.body.orders).toHaveLength(61)
  })

  afterAll(() => {
    db.sequelize.close()
  })
})
