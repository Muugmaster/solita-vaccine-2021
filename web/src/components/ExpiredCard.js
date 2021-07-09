import React from 'react'
import CountUp from 'react-countup'

// material ui
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const ExpiredCard = ({
  expiredVaccinations,
  expiredOrders,
  vaccineGoingToExpire,
  ordersGoingToExpire,
}) => {
  return (
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
                  secondary={<CountUp start={0} end={expiredVaccinations} />}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Expired orders"
                  secondary={<CountUp start={0} end={expiredOrders} />}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item md={6}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Vaccines expiring in 10 days"
                  secondary={<CountUp start={0} end={vaccineGoingToExpire} />}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Orders expiring in 10 days"
                  secondary={<CountUp start={0} end={ordersGoingToExpire} />}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ExpiredCard
