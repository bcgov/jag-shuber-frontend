import React from 'react';
import Popover from './Popover';
import { Glyphicon } from 'react-bootstrap';

export interface HelpPopoverProps {
    helpText: string;
}

export default class HelpPopover extends React.Component<HelpPopoverProps> {
    render() {
        const { 
            helpText,
        } = this.props;

        return (
            <Popover
                trigger={<Glyphicon style={{ color: '#2F588E'}} glyph="question-sign" />}
                displayValue={helpText}
            />
        );
    }
}
