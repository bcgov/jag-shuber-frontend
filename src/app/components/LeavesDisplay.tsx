import React from 'react';
import { Leave } from '../api';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import LeaveCancelledPopover from './LeaveCancelledPopover';
import LeaveSubCodeDisplay from '../containers/LeaveSubCodeDisplay';

export interface LeavesDisplayProps {
    partialDays: Leave[];
    fullDays: Leave[];
}

export default class LeavesDisplay extends React.PureComponent<LeavesDisplayProps, any> {
    render() {
        const { fullDays = [], partialDays = [] } = this.props;
        return (
            <div>
                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Start Date</th>
                            <th className="text-left">End Date</th>
                            <th className="text-left">Type</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {fullDays.map(l => {
                            return (
                                <tr key={l.id}>
                                    <td>{moment(l.startDate).format('MMM D, YYYY')}</td>
                                    <td>{moment(l.endDate).format('MMM D, YYYY')}</td>
                                    <td><LeaveSubCodeDisplay subCode={l.leaveSubCode}/></td>
                                    <td>
                                        {l.cancelDate && <LeaveCancelledPopover leave={l} />}
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>

                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Date</th>
                            <th className="text-left">Start Time</th>
                            <th className="text-left">End Time</th>
                            <th className="text-left">Type</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {partialDays.map(l => {
                            return (
                                <tr key={l.id}>
                                    <td>{moment(l.startDate).format('MMM D, YYYY')}</td>
                                    <td>{moment(l.startTime).format('HH:mm')}</td>
                                    <td>{moment(l.endTime).format('HH:mm')}</td>
                                    <td><LeaveSubCodeDisplay subCode={l.leaveSubCode}/></td>
                                    <td>
                                        {l.cancelDate && <LeaveCancelledPopover leave={l} />}
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>
            </div>
        );
    }
}
