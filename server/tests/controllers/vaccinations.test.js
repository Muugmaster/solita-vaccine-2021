const db = require('../../models')
const supertest = require('supertest')
const app = require('../../app')

const api = supertest(app)

describe('vaccinations controller', () => {
  test('vaccinations are returned as json', async () => {
    await api
      .get('/api/vaccinations')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is 7000 vaccination done total', async () => {
    const response = await api.get('/api/vaccinations')

    expect(response.body.vaccinations).toHaveLength(7000)
  })

  test('when counted from "2021-04-12T11:10:06.473587Z" 13620 vaccines expired before usage.', async () => {
    const response = await api.get(
      '/api/vaccinations/expired?date=2021-04-12T11:10:06.473587Z'
    )

    expect(response.body.expired_amount).toBe(13620)
  })

  afterAll(() => {
    db.sequelize.close()
  })
})
