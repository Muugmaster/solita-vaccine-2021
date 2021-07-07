import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import fiLocale from 'date-fns/locale/fi'

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fiLocale}>
    <App />
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
)
