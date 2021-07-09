import React from 'react'
import { Bar } from 'react-chartjs-2'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const BarChart = ({ all, expired, left, producer }) => {
  const data = {
    labels: ['Vaccines left', 'Vaccines expired', 'Total vaccines'],
    datasets: [
      {
        label: `Total dataset`,
        data: [left, expired, all],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  return (
    <Grid item md={8} xs={12} xl={6}>
      <Box textAlign="center">
        <h1 className="title">Total Vaccinations</h1>
      </Box>
      <Bar data={data} options={options} />
    </Grid>
  )
}

export default BarChart
