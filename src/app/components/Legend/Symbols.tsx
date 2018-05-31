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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <UnavailableIcon backgroundColor="#F1F1F1" />
                    <span className="legend-symbol-text">Unavailable</span>
                </div>
                <div>
                    <AssignedIcon backgroundColor="#F1F1F1" />
                    <span className="legend-symbol-text">Assigned</span>
                </div>
                <div> 
                    <AlertIcon backgroundColor="#F1F1F1" />
                    <span className="legend-symbol-text" style={{ marginRight: 20 }}>Alert - click for details</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SheriffLoanInIcon />
                    <span className="legend-symbol-text" style={{ marginLeft: 4 }}>Sheriff loaned in</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SheriffLoanOutIcon />
                    <span className="legend-symbol-text" style={{ marginLeft: 4 }}>Sheriff loaned out</span>
                </div>
            </div>
        );
    }
}