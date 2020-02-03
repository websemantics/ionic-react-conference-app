import React from 'react'
import { format, parseISO as parseDate } from 'date-fns'

export const Time = ({ date }) => (React.createElement(React.Fragment, null,
  format(parseDate(date), "h:mm aaaaa"),
  "m"))
