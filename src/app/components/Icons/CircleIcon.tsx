import React from 'react';
import './Icons.css';

export interface CircleIconProps {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
}
export default class CircleIcon extends React.PureComponent<CircleIconProps> {
    render() {
        const {
            backgroundColor = 'white', 
            borderColor = 'grey',
            color = 'grey',
        } = this.props;
        return (
            <div 
                className="circle-icon" 
                style={{
                    fontSize: 12, 
                    borderColor, 
                    color, 
                    backgroundColor, 
                    fontWeight: 'normal'
                }}
            >
                {this.props.children}
            </div>
        );
    }
}