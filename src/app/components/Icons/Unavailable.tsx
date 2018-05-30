import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './Icons.css';

export interface UnavailableIconProps {
    backgroundColor?: string;
}
export default class UnavailableIcon extends React.PureComponent<UnavailableIconProps> {
    render() {
        const {backgroundColor = 'white'} = this.props;
        return (
            <Glyphicon
                className="circle-icon"
                glyph="remove"
                style={{ borderColor: 'red', color: 'red', paddingTop: 3, backgroundColor }}
            />
        );
    }
}