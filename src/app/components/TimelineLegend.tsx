import * as React from 'react';

export default class TimelineLegend extends React.PureComponent {
    render() {
        return (
            <div 
                style={{
                    background: '#003366',
                    flex: '0 0 auto',
                    border: '0px',
                    color: '#FFF',
                    textAlign: 'left',
                    padding: '20px'
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
