import React, { useState, useEffect } from 'react'
import ordersService from './services/orders'

// material ui
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import { KeyboardDateTimePicker } from '@material-ui/pickers'

function App() {
  const [orders, setOrders] = useState(null)
  const [vaccines, setVaccines] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getAllOrdersAndVaccines = async (date) => {
    const { orders } = await ordersService.getArrivedBeforeDate(date)

    let sumOfVaccines = 0
    orders.map((item) => {
      return (sumOfVaccines += item.injections)
    })
    setVaccines(sumOfVaccines)
    setOrders(orders.length)
  }

  const handleChange = (date) => {
    getAllOrdersAndVaccines(date)
    setSelectedDate(date)
  }

  useEffect(() => {
    getAllOrdersAndVaccines(new Date())
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
                  {console.log(selectedDate)}
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
              <Box textAlign="center">
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h5" gutterBottom>
                      Total orders and vaccines arrived
                    </Typography>
                    <Grid container justifyContent="center" spacing={0}>
                      <Grid item md={5}>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="Total vaccines"
                              secondary={vaccines}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Total orders"
                              secondary={orders}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item md={5}>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="Total vaccines"
                              secondary={vaccines}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary="Total orders"
                              secondary={orders}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item md={5}>
              <Box textAlign="center">
                <Card>
                  <CardContent>
                    <Typography component="p" gutterBottom>
                      Vaccines: {vaccines} | Orders: {orders}
                      {console.log(selectedDate)}
                    </Typography>
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
