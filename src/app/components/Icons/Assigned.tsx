import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './Icons.css';

export interface AssignedIconProps {
    backgroundColor?: string;
}
export default class AssignedIcon extends React.PureComponent<AssignedIconProps> {
    render() {
        const {backgroundColor = 'white'} = this.props;
        return (
            <Glyphicon
                className="circle-icon"
                style={{ borderColor: 'green', color: 'green', backgroundColor, paddingTop: 2 }}
                glyph="ok"
            />
        );
    }
}