import * as React from 'react';
import './Legend.css';
import SheriffLoanInIcon from '../Icons/SheriffLoanInIcon';
import SheriffLoanOutIcon from '../Icons/SheriffLoanOutIcon';
import UnavailableIcon from '../Icons/Unavailable';
import AssignedIcon from '../Icons/Assigned';
import AlertIcon from '../Icons/Alert';
export interface SymbolsProps {

}
export default class Symbols extends React.PureComponent<SymbolsProps> {
    render() {
        return (
            <div>
                <UnavailableIcon backgroundColor="#F1F1F1" />
                <span className="legend-symbol-text">Unavailable</span>
            
                <AssignedIcon backgroundColor="#F1F1F1" />
                 <span className="legend-symbol-text">Assigned</span>
            
                <AlertIcon backgroundColor="#F1F1F1" />
                 <span className="legend-symbol-text" style={{marginRight: 20}}>Alert - click for details</span>

                <SheriffLoanInIcon /> 
                <span className="legend-symbol-text" style={{marginLeft: 4}}>Sheriff loaned in</span>

                <SheriffLoanOutIcon />
                <span className="legend-symbol-text" style={{marginLeft: 4}}>Sheriff loaned out</span>
            </div>
        );
    }
}