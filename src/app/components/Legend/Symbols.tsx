import * as React from 'react';
import './Legend.css';
import { Glyphicon } from 'react-bootstrap';

export interface SymbolsProps {

}

export default class Symbols extends React.PureComponent<SymbolsProps> {
    render() {
        return (
            <div>
                <Glyphicon
                    className="legend-symbol"
                    glyph="remove"
                    style={{ borderColor: 'red', color: 'red', paddingTop: 2}}
                />
                <span style={{paddingRight: 10}}>Unavailable</span>
            
                <Glyphicon
                    className="legend-symbol"
                    style={{ borderColor: 'green', color: 'green' }}
                    glyph="ok"
                />
                 <span style={{paddingRight: 10}}>Assigned</span>
            
                <Glyphicon
                    className="legend-symbol"
                    glyph="alert"
                    style={{ borderColor: 'darkorange', color: 'darkorange'}}
                />
                 <span style={{paddingRight: 10}}>Alert - click for details</span>
            </div>
        );
    }
}