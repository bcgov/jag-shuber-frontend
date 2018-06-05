import React from 'react';
import './Icons.css';

export interface CircleIconWithChildrenProps {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
}
export default class CircleIconWithChildren extends React.PureComponent<CircleIconWithChildrenProps> {
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