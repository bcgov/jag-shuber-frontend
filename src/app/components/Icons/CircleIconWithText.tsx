import * as React from 'react';
import './Icons.css';

export interface CircleIconWithTextProps {
    backgroundColor?: string;
    text?: string;
}
export default class CircleIconWithText extends React.PureComponent<CircleIconWithTextProps> {
    render() {
        const {backgroundColor = 'white', text} = this.props;
        return (
            <div 
                className="circle-icon" 
                style={{
                    fontSize: 12, 
                    borderColor: 'grey', 
                    color: 'grey', 
                    backgroundColor, 
                    fontWeight: 'normal' 
                }}
            >
                {text}
            </div>
        );
    }
}