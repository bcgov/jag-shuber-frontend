import React from 'react';
import moment from 'moment';
import Popover from './Popover';
import { Glyphicon } from 'react-bootstrap';
import { Leave, LEAVE_CODE_PERSONAL } from '../api/Api';
import LeaveCancelReasonCodeDisplay from '../containers/LeaveCancelReasonCodeDisplay';

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
                title={`${leave.leaveCode === LEAVE_CODE_PERSONAL ? 'Leave' : 'Training'} Cancelled`}
                displayValue={
                    <span>
                        <b>Date: </b>{moment(leave.cancelDate).format('MMM D, YYYY')}<br />
                        <b>Reason: </b><LeaveCancelReasonCodeDisplay code={leave.cancelReasonCode}/>
                    </span>
                }
            />
        );
    }
}
