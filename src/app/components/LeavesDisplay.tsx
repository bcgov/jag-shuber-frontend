import * as React from 'react';
import { Leave } from '../api';
import { Table, Glyphicon } from 'react-bootstrap';
import moment from 'moment';
import Popover from './Popover';

export interface LeavesDisplayProps {
    leaves: Leave[];
}

export default class LeavesDisplay extends React.PureComponent<LeavesDisplayProps, any> {
    render() {
        const { leaves = [] } = this.props;
        return (
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
                    {leaves.map(l => {
                        return (
                            <tr key={l.id}>
                                <td>{moment(l.startDate).format('MMM D, YYYY')}</td>
                                <td>{moment(l.endDate).format('MMM D, YYYY')}</td>
                                <td>{l.leaveTypeCode}</td>
                                <td>
                                    {l.cancelDate && <Popover
                                        trigger={<Glyphicon style={{ color: 'red' }} glyph="ban-circle" />}
                                        title={'Leave Cancelled'}
                                        displayValue={
                                            <span>
                                                <b>Date: </b>{moment(l.cancelDate).format('MMM D, YYYY')}<br />
                                                <b>Reason: </b>{l.cancelReasonCode}
                                            </span>
                                        }
                                    />}
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
        );
    }
}
