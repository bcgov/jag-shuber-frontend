import * as React from 'react';
import { Moment } from 'moment';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import './CalendarButton.css';

export interface CalendarButtonProps {
    onChange: (selectedDate: Moment) => void;
    defaultValue: Moment;
    todayOnClick: () => void;
}

export interface CalendarButtonState {
    isOpen: boolean;
}

export default class CalendarButton extends React.Component<CalendarButtonProps, CalendarButtonState> {
    state = {
        isOpen: false
    };

    private handleOnChange(event: Moment) {
        const { onChange } = this.props;
        if (onChange) {
            onChange(event);
        }
        this.toggleShow();
    }

    private toggleShow() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    private handleTodayOnClick() {
        const { todayOnClick } = this.props;
        const { isOpen } = this.state;
        if (todayOnClick) {
            todayOnClick();
        }
        if (isOpen) {
            this.toggleShow();
        }

    }

    render() {
        const { defaultValue } = this.props;
        const { isOpen } = this.state;
        const display = isOpen ? 'block' : 'none';
        return (
            <div>
                <Button
                    onClick={() => this.toggleShow()}
                    bsStyle="link"
                    bsSize="large"
                    style={{ color: 'white' }}
                >
                    <Glyphicon glyph="calendar" />
                </Button>
                <div style={{ display }}>
                    <Button
                        onClick={() => this.handleTodayOnClick()}
                        bsStyle="link"
                        style={{ color: 'white', paddingBottom: 5, zIndex: 1000 }}
                    >
                        Today
                    </Button>
                    <DateTime
                        timeFormat={false}
                        onChange={(event: Moment) => this.handleOnChange(event)}
                        value={defaultValue}
                        input={false}
                        open={true}
                    />
                    
                </div>
            </div>
        );
    }
}
