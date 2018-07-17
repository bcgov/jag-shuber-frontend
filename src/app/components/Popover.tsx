import React from 'react';
import { OverlayTrigger, Popover as ReactPopover } from 'react-bootstrap';

export interface PopoverProps {
    placement?: string;
    displayValue: React.ReactNode;
    trigger: React.ReactNode;
    title?: string;
}

export default class Popover extends React.Component<PopoverProps, any> {
    render() {
        const { placement = 'right', displayValue, trigger, title } = this.props;
        return (
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement={placement}
                overlay={
                    title 
                    ? <ReactPopover title={title}>{displayValue}</ReactPopover>
                    : <ReactPopover>{displayValue}</ReactPopover>}
            >
                {trigger}
            </OverlayTrigger>
        );
    }
}
