import React from 'react';
import './Icons.css';

export interface CircleIconProps {
    style?: React.CSSProperties;
}
export default class CircleIcon extends React.PureComponent<CircleIconProps> {
    render() {
        const {
            style = {}
        } = this.props;
        return (
            <div 
                className="circle-icon" 
                style={{
                    fontSize: 12, 
                    borderColor: 'grey', 
                    color: 'grey', 
                    backgroundColor: 'white', 
                    fontWeight: 'normal',
                    ...style
                }}
            >
                {this.props.children}
            </div>
        );
    }
}