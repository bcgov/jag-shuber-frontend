import React from 'react';
import moment from 'moment';
import Popover from './Popover';
import { Glyphicon } from 'react-bootstrap';
import { Leave } from '../api/Api';
import LeaveCancelReasonCodeDisplay from '../containers/LeaveCancelReasonCodeDisplay';

export interface CancelledPopoverProps {
    model: Partial<any>;
    style?: React.CSSProperties;
}

export default class CancelledPopover extends React.Component<CancelledPopoverProps> {
    render() {
        const { model, style} = this.props;
        return (
            <Popover
                trigger={<Glyphicon style={{ color: 'red', ...style }} glyph="ban-circle" />}
                title={`${Leave.getLeaveTypeDisplay(model)} Cancelled`}
                displayValue={
                    <span>
                        <b>Date: </b>{moment(model.cancelDate).format('MMM D, YYYY')}<br />
                        <b>Reason: </b><LeaveCancelReasonCodeDisplay code={model.cancelReasonCode}/>
                    </span>
                }
            />
        );
    }
}
