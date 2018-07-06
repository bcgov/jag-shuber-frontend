import React from 'react';
import { Leave } from '../api';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import LeaveCancelledPopover from './LeaveCancelledPopover';
import { fromTimeString } from 'jag-shuber-api/dist/client';
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
                <h3>Full Day</h3>
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
                <h3>Partial Day</h3>
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
                                    <td>{fromTimeString(l.startTime as string).format('HH:mm')}</td>
                                    <td>{fromTimeString(l.endTime as string).format('HH:mm')}</td>
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
