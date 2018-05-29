import * as React from 'react';
import './Legend.css';
import { Glyphicon } from 'react-bootstrap';
import SheriffLoanInIcon from '../SheriffLoanInIcon';
import SheriffLoanOutIcon from '../SheriffLoanOutIcon';
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
                <span className="legend-symbol-text">Unavailable</span>
            
                <Glyphicon
                    className="legend-symbol"
                    style={{ borderColor: 'green', color: 'green' }}
                    glyph="ok"
                />
                 <span className="legend-symbol-text">Assigned</span>
            
                <Glyphicon
                    className="legend-symbol"
                    glyph="alert"
                    style={{ borderColor: 'darkorange', color: 'darkorange'}}
                />
                 <span className="legend-symbol-text" style={{marginRight: 20}}>Alert - click for details</span>

                <SheriffLoanInIcon /> 
                <span className="legend-symbol-text" style={{marginLeft: 4}}>Sheriff loaned in</span>

                <SheriffLoanOutIcon />
                <span className="legend-symbol-text" style={{marginLeft: 4}}>Sheriff loaned out</span>
            </div>
        );
    }
}