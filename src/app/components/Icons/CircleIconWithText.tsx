import * as React from 'react';
import './Icons.css';

export interface CircleIconWithTextProps {
    backgroundColor?: string;
    text?: string;
    borderColor?: string;
    color?: string;
}
export default class CircleIconWithText extends React.PureComponent<CircleIconWithTextProps> {
    render() {
        const {
            backgroundColor = 'white', 
            text,
            borderColor = 'grey',
            color = 'grey'
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
                {text}
            </div>
        );
    }
}