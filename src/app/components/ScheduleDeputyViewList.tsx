import * as React from 'react';
import * as moment from 'moment';
import { Table } from 'react-bootstrap';
import {
    DaysOfWeek,
    Sheriff,
    Shift,
    MapType
} from '../api/Api';
import CirlceIconWithText from '../components/Icons/CircleIconWithText';
import { getWorkSectionColour } from '../api/utils';
import { getForegroundColor } from '../infrastructure/colorUtils';
import toTitleCase from '../infrastructure/toTitleCase';

export interface ScheduleDeputyViewListProps {
    daysToDisplay?: DaysOfWeek;
    sheriffs: Sheriff[];
    shifts: Shift[];
    includeWorkSection?: boolean;
}
export default class ScheduleDeputyViewList extends React.PureComponent<ScheduleDeputyViewListProps> {
    render() {
        const {
            sheriffs = [],
            shifts = [],
            daysToDisplay = DaysOfWeek.Weekdays,
            includeWorkSection = true
        } = this.props;

        const displayDayNumbers = DaysOfWeek.getWeekdayNumbers(daysToDisplay);

        const weekStart = moment(shifts[0].startDateTime).startOf('week');
        const dayDisplay = displayDayNumbers.map(dayNum => moment(weekStart).add(dayNum, 'day').format('ddd, MMM D'));

        const sheriffShiftMap = shifts.reduce<MapType<Shift[]>>((map, currentShift) => {
            const key = currentShift.sheriffId as string;
            if (!map[key]) {
                map[key] = [];
            }
            map[key].push(currentShift);
            return map;
        }, {});

        return (
            <div>
                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Name</th>
                            {dayDisplay.map(d => <th key={d}>{d}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {sheriffs.map(sheriff => {
                            const {id, firstName, lastName} = sheriff;
                            const sheriffShifts: Shift[] = sheriffShiftMap[id] ? sheriffShiftMap[id] : [];
                            return (
                                <tr key={id}>
                                    <td>{`${toTitleCase(lastName)}, ${toTitleCase(firstName)}`}</td>
                                    {displayDayNumbers.map(dayNum => {
                                        const shiftForDay = sheriffShifts
                                            .find(shift => moment(shift.startDateTime).weekday() === dayNum);
                                        if (shiftForDay) {
                                            const { workSectionId, startDateTime, endDateTime } = shiftForDay;
                                            const backgroundColor = getWorkSectionColour(workSectionId);
                                            const foregroundColor = getForegroundColor(backgroundColor);
                                            return (
                                                <td>
                                                    <div style={{ display: 'flex' }}>
                                                        {includeWorkSection && <CirlceIconWithText
                                                            text={workSectionId ? workSectionId.charAt(0) : ''}
                                                            backgroundColor={backgroundColor}
                                                            borderColor={backgroundColor}
                                                            color={foregroundColor}
                                                        />}
                                                        <span style={{marginTop: 3}}>
                                                            {`${moment(startDateTime).format('HH:mm')}
                                                            - ${moment(endDateTime).format('HH:mm')}`}
                                                        </span>
                                                    </div>
                                                </td>
                                            );
                                        } else {
                                            return <td/>;
                                        }
                                    }
                                    )
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}