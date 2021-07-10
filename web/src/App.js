import React, { useState, useEffect } from 'react'
import ordersService from './services/orders'
import vaccinationService from './services/vaccinations'
import BarChart from './components/chart/BarChart'

// material ui
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import { KeyboardDateTimePicker } from '@material-ui/pickers'
import ArrivedCard from './components/ArrivedCard'
import ExpiredCard from './components/ExpiredCard'

function App() {
  const [orders, setOrders] = useState(0)
  const [vaccines, setVaccines] = useState(0)
  const [totalVacc, setTotalVacc] = useState(0)
  const [ordersByDate, setOrdersByDate] = useState(0)
  const [vaccinesByDate, setVaccinesByDate] = useState(0)
  const [expiredVaccinations, setExpiredVaccinations] = useState(0)
  const [expiredOrders, setExpiredOrders] = useState(0)
  const [vaccineGoingToExpire, setVaccineGoingToExpire] = useState(0)
  const [ordersGoingToExpire, setOrdersGoingToExpire] = useState(0)
  const [producer, setProducer] = useState('Total')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [vaccLeft, setVaccleft] = useState(null)

  const getAllOrdersAndVaccines = async (date) => {
    const { orders } = await ordersService.getArrivedBeforeDate(date)

    let sumOfVaccines = 0
    orders.map((item) => {
      return (sumOfVaccines += item.injections)
    })
    setVaccines(sumOfVaccines)
    setTotalVacc(sumOfVaccines)
    setOrders(orders.length)
    vaccinationsLeft(date)
  }

  const getAllOrdersAndVaccinesByProd = async (date, prod) => {
    if (prod === 'Total') {
      return getAllOrdersAndVaccines(date)
    }

    const { orders } = await ordersService.getArrivedBeforeDateAndProd(
      date,
      prod
    )

    let sumOfVaccines = 0
    orders.map((item) => {
      return (sumOfVaccines += item.injections)
    })

    setVaccines(sumOfVaccines)
    setOrders(orders.length)
  }

  const getOrdersByGivenDate = async (date, prod) => {
    let { orders } = await ordersService.getArrivedByDate(date)

    if (prod !== 'Total') {
      orders = orders.filter((item) => {
        return item.vaccine === prod
      })
    }

    let sumOfVaccines = 0
    orders.map((item) => {
      return (sumOfVaccines += item.injections)
    })

    setVaccinesByDate(sumOfVaccines)
    setOrdersByDate(orders.length)
  }

  const getExpiredVaccinations = async (date) => {
    const addHours = new Date(date.setHours(date.getHours() + 3))
    const isoDate = new Date(addHours).toISOString()
    const response = await vaccinationService.getExpiredByDate(isoDate)
    setExpiredVaccinations(response.expired_amount)
    setExpiredOrders(response.orders.length)
    const expiresIn10Days = await isExpiredIn10Days(date)
    const expiringVaccinations =
      expiresIn10Days.expired_amount - response.expired_amount
    const expiringOrders =
      expiresIn10Days.orders.length - response.orders.length
    setVaccineGoingToExpire(expiringVaccinations)
    setOrdersGoingToExpire(expiringOrders)
  }

  const isExpiredIn10Days = async (date) => {
    const add10Days = new Date(date.setDate(date.getDate() + 10))
    const isoDate = new Date(add10Days).toISOString()
    return await vaccinationService.getExpiredByDate(isoDate)
  }

  const vaccinationsLeft = async (date) => {
    const vaccinations = await vaccinationService.getAll(date)
    setVaccleft(vaccinations.vaccinations.length)
  }

  const handleChange = (date) => {
    setSelectedDate(new Date(date))
    getAllOrdersAndVaccines(date)
    getOrdersByGivenDate(date, producer)
    getExpiredVaccinations(date)
    vaccinationsLeft(date)
    setProducer('Total')
  }

  const handleSelectChange = (event) => {
    const value = event.target.value
    setProducer(value)
    getAllOrdersAndVaccinesByProd(selectedDate, value)
    getOrdersByGivenDate(selectedDate, value)
  }

  useEffect(() => {
    setSelectedDate(new Date())
    getAllOrdersAndVaccines(selectedDate)
    getExpiredVaccinations(selectedDate)
    vaccinationsLeft(selectedDate)
  }, [])

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={10} xl={8}>
            <Box textAlign="center">
              <Typography variant="h1" component="h2" gutterBottom>
                Vaccine App
              </Typography>
            </Box>
          </Grid>
          <Grid item md={10} xs={12} xl={8}>
            <Box textAlign="center">
              <Typography variant="h5" component="h5" gutterBottom>
                Select date and start exploring data about orders, vaccines and
                vaccinations.
              </Typography>
              <Box my={5}>
                <KeyboardDateTimePicker
                  autoOk
                  ampm={false}
                  showTodayButton
                  disableToolbar
                  disableFuture
                  format="dd/MM/yyyy HH:mm"
                  value={selectedDate}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
          {totalVacc !== 0 ? (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item md={12} xl={8}>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item md={5}>
                <ArrivedCard
                  producer={producer}
                  handleSelectChange={handleSelectChange}
                  vaccines={vaccines}
                  orders={orders}
                  vaccinesByDate={vaccinesByDate}
                  ordersByDate={ordersByDate}
                />
              </Grid>
              <Grid item md={5}>
                <Box textAlign="center">
                  <ExpiredCard
                    expiredVaccinations={expiredVaccinations}
                    expiredOrders={expiredOrders}
                    vaccineGoingToExpire={vaccineGoingToExpire}
                    ordersGoingToExpire={ordersGoingToExpire}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={2}>
            <BarChart
              all={totalVacc}
              expired={expiredVaccinations}
              left={totalVacc - expiredVaccinations - vaccLeft}
            />
          </Grid>
        </Grid>
          ): (
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
      </Grid>
    </Grid>
  )
}

export default App
