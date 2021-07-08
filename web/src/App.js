import React, { useState, useEffect } from 'react'
import ordersService from './services/orders'
import vaccinationService from './services/vaccinations'

// material ui
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { KeyboardDateTimePicker } from '@material-ui/pickers'

function App() {
  const [orders, setOrders] = useState(null)
  const [vaccines, setVaccines] = useState(null)
  const [ordersByDate, setOrdersByDate] = useState(null)
  const [vaccinesByDate, setVaccinesByDate] = useState(null)
  const [expiredVaccinations, setExpiredVaccinations] = useState(null)
  const [expiredOrders, setExpiredOrders] = useState(null)
  const [vaccineGoingToExpire, setVaccineGoingToExpire] = useState(null)
  const [ordersGoingToExpire, setOrdersGoingToExpire] = useState(null)
  const [producer, setProducer] = useState('Total')
  const [selectedDate, setSelectedDate] = useState(new Date())

  const PRODS = ['Antiqua', 'SolarBuddhica', 'Zerpfy', 'Total']

  const getAllOrdersAndVaccines = async (date) => {
    const { orders } = await ordersService.getArrivedBeforeDate(date)

    let sumOfVaccines = 0
    orders.map((item) => {
      return (sumOfVaccines += item.injections)
    })
    setVaccines(sumOfVaccines)
    setOrders(orders.length)
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
    console.log(prod)
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

  const handleChange = (date) => {
    getAllOrdersAndVaccines(date)
    setSelectedDate(new Date(date))
    getOrdersByGivenDate(date, producer)
    getExpiredVaccinations(date)
    setProducer('Total')
  }

  const handleSelectChange = (event) => {
    setProducer(event.target.value)
    getAllOrdersAndVaccinesByProd(selectedDate, event.target.value)
    getOrdersByGivenDate(selectedDate, event.target.value)
  }

  useEffect(() => {
    getAllOrdersAndVaccines(new Date())
    getExpiredVaccinations(new Date())
  }, [])

  return (
    <div>
      <Grid container justifyContent="center" spacing={2}>
        <Typography variant="h1" component="h2" gutterBottom>
          Vaccine App
        </Typography>
        <Grid item md={10} xs={12}>
          <Box textAlign="center">
            <Card>
              <CardContent>
                <Typography variant="h4" component="h4" gutterBottom>
                  Vaccines: {vaccines} | Orders: {orders}
                </Typography>
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
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item md={12}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item md={5}>
              <Card>
                <CardContent>
                  <Box textAlign="center" mb={2}>
                    <Typography variant="h5" component="h5" gutterBottom>
                      Orders and vaccines arrived
                    </Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={producer}
                      onChange={handleSelectChange}
                    >
                      {PRODS.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Grid container justifyContent="center" spacing={0}>
                    <Grid item md={5}>
                      <Typography variant="h6" component="h6" gutterBottom>
                        Before date:
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary={`${producer} vaccines`}
                            secondary={vaccines}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`${producer} orders`}
                            secondary={orders}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item md={5}>
                      <Typography variant="h6" component="h6" gutterBottom>
                        Selected date:
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary={`${producer} vaccines`}
                            secondary={
                              vaccinesByDate
                                ? vaccinesByDate
                                : 'No arrived orders on this day'
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`${producer} orders`}
                            secondary={
                              ordersByDate
                                ? ordersByDate
                                : 'No arrived orders on this day'
                            }
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={5}>
              <Box textAlign="center">
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h5" gutterBottom>
                      Total orders and vaccines expired
                    </Typography>
                    <Grid container justifyContent="center" spacing={0}>
                      <Grid item md={4}>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="Expired vaccines"
                              secondary={expiredVaccinations}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Expired orders"
                              secondary={expiredOrders}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item md={6}>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="Vaccines expiring in 10 days"
                              secondary={vaccineGoingToExpire}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Orders expiring in 10 days"
                              secondary={ordersGoingToExpire}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
