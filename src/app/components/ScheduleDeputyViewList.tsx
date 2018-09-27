import * as React from 'react';
import * as moment from 'moment';
import { Table } from 'react-bootstrap';
import {
    DaysOfWeek,
    Sheriff,
    Shift,
    MapType,
    TimeType
} from '../api/Api';
import CircleIcon from './Icons/CircleIcon';
import { getWorkSectionColour } from '../api/utils';
import { getForegroundColor } from '../infrastructure/colorUtils';
import toTitleCase from '../infrastructure/toTitleCase';
import SheriffLoanOutIcon from './Icons/SheriffLoanOutIcon';
import LocationDisplay from '../containers/LocationDisplay';

export interface ScheduleDeputyViewListProps {
    daysToDisplay?: DaysOfWeek;
    sheriffs: Sheriff[];
    shifts: Shift[];
    includeWorkSection?: boolean;
    weekStart?: TimeType;
    sheriffLoanMap?: MapType<{isLoanedIn: boolean, isLoanedOut: boolean}>;
}
export default class ScheduleDeputyViewList extends React.PureComponent<ScheduleDeputyViewListProps> {
    render() {
        const {
            sheriffs = [],
            shifts = [],
            daysToDisplay = DaysOfWeek.Weekdays,
            includeWorkSection = true,
            weekStart = moment().startOf('week'),
            sheriffLoanMap = {}
        } = this.props;

        const displayDayNumbers = DaysOfWeek.getWeekdayNumbers(daysToDisplay);

        const dayDisplay = displayDayNumbers.map(dayNum => moment(weekStart).add(dayNum, 'day').format('dddd, MMM D'));

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
                <Table responsive={true} striped={true}>
                    <thead>
                        <tr>
                            <th className="text-left">Name</th>
                            {dayDisplay.map(d => <th className="text-left" key={d}>{d}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {sheriffs.map(sheriff => {
                            const { id, firstName, lastName } = sheriff;
                            const sheriffShifts: Shift[] = sheriffShiftMap[id] ? sheriffShiftMap[id] : [];
                            return (
                                <tr key={id}>
                                    <td>{`${toTitleCase(lastName)}, ${toTitleCase(firstName)}`}</td>
                                    {displayDayNumbers.map(dayNum => {
                                        const shiftForDay = sheriffShifts
                                            .find(shift => moment(shift.startDateTime).weekday() === dayNum);
                                        const loanedOutForDay = 
                                            sheriffLoanMap[sheriff.id].isLoanedOut && moment().weekday() === dayNum;
                                        if (loanedOutForDay) {
                                            const { currentLocationId = '' } = sheriff;
                                            return (
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <SheriffLoanOutIcon />
                                                        <span style={{marginLeft: 8}}>
                                                            <LocationDisplay id={currentLocationId} />
                                                        </span>
                                                    </div>
                                                </td>
                                            );

                                        } else if (shiftForDay) {
                                            const { workSectionId, startDateTime, endDateTime } = shiftForDay;
                                            const backgroundColor = getWorkSectionColour(workSectionId);
                                            const foregroundColor = getForegroundColor(backgroundColor);
                                            return (
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {includeWorkSection &&
                                                            <CircleIcon
                                                                style={{
                                                                    backgroundColor, 
                                                                    borderColor: backgroundColor, 
                                                                    color: foregroundColor
                                                                }}    
                                                            >
                                                                {workSectionId ? workSectionId.charAt(0) : ''}
                                                            </CircleIcon>}
                                                        <span style={{ marginLeft: 4 }}>
                                                            {`${moment(startDateTime).format('HH:mm')}
                                                            - ${moment(endDateTime).format('HH:mm')}`}
                                                        </span>
                                                    </div>
                                                </td>
                                            );
                                        } else {
                                            return <td />;
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