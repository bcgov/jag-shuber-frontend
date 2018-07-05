import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './Icons.css';

export interface AlertIconProps {
    backgroundColor?: string;
}
export default class AlertIcon extends React.PureComponent<AlertIconProps> {
    render() {
        const { backgroundColor = 'white', ...rest } = this.props;
        return (
            <Glyphicon
                className="circle-icon"
                glyph="alert"
                style={{
                    borderColor: 'darkorange',
                    color: 'darkorange',
                    backgroundColor,
                    paddingTop: 2,
                    top: 0
                }}
                {...rest}
            />
        );
    }
}