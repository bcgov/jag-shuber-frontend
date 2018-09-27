import React from 'react';
import Popover from './Popover';
import { Glyphicon } from 'react-bootstrap';
import { Leave } from '../api/Api';
import { fromTimeString } from 'jag-shuber-api';

export interface PartialLeavePopoverProps {
    leave?: Partial<Leave>;
    placement?: string;
    icon?: React.ReactNode;
}

export default class PartialLeavePopover extends React.Component<PartialLeavePopoverProps> {
    render() {
        const { 
            leave = {}, 
            placement = 'left',
            icon = <Glyphicon style={{ color: 'darkorange', zIndex: 1000}} glyph="alert" />
        } = this.props;

        return (
            <Popover
                trigger={icon}
                title={`${Leave.getLeaveTypeDisplay(leave)} - Partial Day`}
                placement={placement}
                displayValue={
                    <span>
                        {fromTimeString(leave.startTime as string).format('HH:mm')}-{fromTimeString(leave.endTime as string).format('HH:mm')}
                    </span>
                }
            />
        );
    }
}
