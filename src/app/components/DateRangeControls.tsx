import React from 'react';
import moment from 'moment';
import { DateType } from '../api/Api';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import CalendarButton from './CalendarButton/CalendarButton';

export interface DateRangeControlProps {
    onNext: () => void;
    onPrevious: () => void;
    onToday: () => void;
    onSelect: (date: DateType) => void;
    defaultDate: any;
}

export default class DateControlRange extends React.Component<DateRangeControlProps, any> {
    render() {
        const {
            onNext,
            onPrevious,
            onSelect,
            onToday,
            defaultDate
        } = this.props;
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    onClick={() => onPrevious && onPrevious()}
                    bsStyle="link"
                    bsSize="large"
                    style={{ color: 'white' }}
                >
                    <Glyphicon glyph="chevron-left" />
                </Button>

                <CalendarButton
                    onChange={(selectedDate) => onSelect && onSelect(selectedDate as any)}
                    defaultValue={moment(defaultDate)}
                    todayOnClick={() => onToday && onToday()}
                />

                <Button
                    onClick={() => onNext && onNext()}
                    bsStyle="link"
                    bsSize="large"
                    style={{ color: 'white' }}
                >
                    <Glyphicon glyph="chevron-right" />
                </Button>
            </div>
        );
    }
}
