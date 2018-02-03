import * as React from 'react';
import * as moment from 'moment';
import {
    DateType
} from '../api'

export interface DateDisplayProps {
    date: DateType;
    format?: string;
}

export default class DateDisplay extends React.PureComponent<DateDisplayProps> {
  render() {
      const { date, format = "dddd, MMMM D YYYY, h:mm:ss a" } = this.props;
    return (
        moment(date).format(format)
    );
  }
}
