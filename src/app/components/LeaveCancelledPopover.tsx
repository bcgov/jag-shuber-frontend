import React from 'react';
import moment from 'moment';
import Popover from './Popover';
import { Glyphicon } from 'react-bootstrap';
import { Leave } from '../api/Api';

export interface LeaveCancelledPopoverProps {
    leave: Partial<Leave>;
    style?: React.CSSProperties;
}

export default class LeaveCancelledPopover extends React.Component<LeaveCancelledPopoverProps> {
    render() {
        const { leave, style} = this.props;
        return (
            <Popover
                trigger={<Glyphicon style={{ color: 'red', ...style }} glyph="ban-circle" />}
                title={'Leave Cancelled'}
                displayValue={
                    <span>
                        <b>Date: </b>{moment(leave.cancelDate).format('MMM D, YYYY')}<br />
                        <b>Reason: </b>{leave.cancelReasonCode}
                    </span>
                }
            />
        );
    }
}
