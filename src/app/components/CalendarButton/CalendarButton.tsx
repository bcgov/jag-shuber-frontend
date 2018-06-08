import * as React from 'react';
import { Moment } from 'moment';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import './CalendarButton.css';
import { Dropdown } from 'react-bootstrap';

export interface CalendarButtonProps {
    onChange: (selectedDate: Moment) => void;
    defaultValue: Moment;
    todayOnClick: () => void;
}

export default class CalendarButton extends React.Component<CalendarButtonProps> {
    private handleOnChange(event: Moment) {
        const { onChange } = this.props;
        if (onChange) {
            onChange(event);
        }
    }

    private handleTodayOnClick() {
        const { todayOnClick } = this.props;
        if (todayOnClick) {
            todayOnClick();
        }
    }

    render() {
        const { defaultValue } = this.props;
        return (
            <div className="calendar-button">
                <Dropdown id="schedule-calendar-button" pullRight={true}>
                    <Dropdown.Toggle
                        noCaret={true}
                        style={{ fontSize: 18, background: 'transparent', color: 'white', border: 0 }}>
                        <Glyphicon glyph="calendar" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Button
                            onClick={() => this.handleTodayOnClick()}
                            bsStyle="link"
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
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}
