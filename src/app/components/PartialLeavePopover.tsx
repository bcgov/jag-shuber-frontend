import React from 'react';
import moment from 'moment';
import Popover from './Popover';
import { Glyphicon } from 'react-bootstrap';
import { Leave } from '../api/Api';
// import AlertIcon from './Icons/Alert';

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
            icon = <Glyphicon style={{ color: 'darkorange', zIndex: 2000}} glyph="alert" />
        } = this.props;

        return (
            <Popover
                trigger={icon}
                title={'Leave - Partial Day'}
                placement={placement}
                displayValue={
                    <span>
                        {moment(leave.startTime).format('HH:mm')}-{moment(leave.endTime).format('HH:mm')}
                    </span>
                }
            />
        );
    }
}
