const { once } = require('events')
const { createReadStream } = require('fs')
const { createInterface } = require('readline')
const db = require('./models')
const { orders, vaccinations } = require('./models')

const DATA = [
  './data/Antiqua.source',
  './data/SolarBuddhica.source',
  './data/Zerpfy.source',
]

const VACCINATIONS = './data/vaccinations.source'

async function processLineByLine(fileName) {
  const arr = []
  try {
    let readStream = createReadStream(fileName)
    const rl = createInterface({
      input: readStream,
      crlfDelay: Infinity,
    })

    rl.on('line', (line) => {
      let obj = JSON.parse(line)
      arr.push(obj)
    })

    await once(rl, 'close')

    console.log('File processed.')

    return arr
  } catch (err) {
    console.error(err)
  }
}

const addToDbTable = async (fileName) => {
  const data = await processLineByLine(fileName)
  data.map(async (item) => {
    await orders
      .create({
        id: item.id,
        healthCareDistrict: item.healthCareDistrict,
        orderNumber: item.orderNumber,
        responsiblePerson: item.responsiblePerson,
        injections: item.injections,
        arrived: item.arrived,
        vaccine: item.vaccine,
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

const addToVaccinationsTable = async (fileName) => {
  const data = await processLineByLine(fileName)
  data.map(async (item) => {
    await vaccinations.create({
      id: item.vaccination_id,
      gender: item.gender,
      sourceBottle: item.sourceBottle,
      vaccinationDate: item.vaccinationDate,
    })
  })
}

const main = async () => {
  try {
    await db.sequelize.sync({ force: true })
    for (i = 0; i < DATA.length; i++) {
      console.log(DATA[i])
      addToDbTable(DATA[i])
    }
    addToVaccinationsTable(VACCINATIONS)
    // await db.sequelize.close()
  } catch (error) {
    console.log(error)
  }
}

main()
