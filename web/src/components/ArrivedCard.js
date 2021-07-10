import React from 'react'
import CountUp from 'react-countup'

// material ui
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const ArrivedCard = ({
  producer,
  handleSelectChange,
  vaccines,
  orders,
  vaccinesByDate,
  ordersByDate,
}) => {
  const PRODS = ['Antiqua', 'SolarBuddhica', 'Zerpfy', 'Total']
  return (
    <Card>
      <CardContent>
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" component="h5" gutterBottom>
            Orders and vaccines arrived
          </Typography>
          <Select
            variant="outlined"
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
                  secondary={<CountUp start={0} end={vaccines} />}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${producer} orders`}
                  secondary={<CountUp start={0} end={orders} />}
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
                    vaccinesByDate ? (
                      <CountUp start={0} end={vaccinesByDate} />
                    ) : (
                      'No arrived orders on this day'
                    )
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${producer} orders`}
                  secondary={
                    ordersByDate ? (
                      <CountUp start={0} end={ordersByDate} />
                    ) : (
                      'No arrived orders on this day'
                    )
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ArrivedCard
