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
        
        let dateFormat = "";
        if (showMonth && showDay && showYear && showTime) {
            dateFormat = "MMM D, YYYY H:mm";
        }
        else if (showMonth && showDay && showYear && !showTime) {
            dateFormat = "MMM D, YYYY";
        }
        else if (showMonth && !showDay && showYear && !showTime) {
            dateFormat = "MMM YYYY";
        }
        else if (!showMonth && !showDay && !showYear && showTime) {
            dateFormat = "H:mm";
        }
        else{
            dateFormat = "MMM D, YYYY";
        }

        return (
            moment(date).format(dateFormat)
        );
    }
}
