import * as React from 'react';
import * as moment from 'moment';
import {
    DateType
} from '../api'

export interface DateDisplayProps {
    date: DateType;
    showDay?: boolean;
    showMonth?: boolean;
    showYear?: boolean;
    showTime?: boolean;
}

export default class DateDisplay extends React.PureComponent<DateDisplayProps> {
    render() {
        const { date, showMonth=false, showDay=false, showYear=false, showTime=false } = this.props;
        
        let dateFormats = [];
        if (showMonth) {
            dateFormats.push("MMM");
        }
        if (showDay) {
            dateFormats.push("D");
        }
        if (showYear) {
            dateFormats.push("YYYY");
        }
        if (showTime) {
            dateFormats.push("HH:mm");       
        }
        
        const dateFormat = dateFormats.join(" ");

        return (
            moment(date).format(dateFormat)
        );
    }
}
