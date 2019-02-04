import * as React from 'react';
import './Legend.css';
import SheriffLoanInIcon from '../Icons/SheriffLoanInIcon';
import SheriffLoanOutIcon from '../Icons/SheriffLoanOutIcon';
import UnavailableIcon from '../Icons/Unavailable';
import AssignedIcon from '../Icons/Assigned';
import AlertIcon from '../Icons/Alert';
export interface SymbolsProps {

}


class SymbolDisplay extends React.PureComponent<{ label: string }>{
    render() {
        const { label } = this.props;
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {this.props.children}
                <span className="legend-symbol-text" style={{ marginLeft: 4 }}>{label}</span>
            </div>
        );
    }
}

export default class Symbols extends React.PureComponent<SymbolsProps> {
    render() {
        const symbols = [
            {
                label: "Unavailable",
                content: <UnavailableIcon backgroundColor="#F1F1F1" />
            },
            {
                label: "Assigned",
                content: <AssignedIcon backgroundColor="#F1F1F1" />
            },
            {
                label: "Alert - click for details",
                content: <AlertIcon backgroundColor="#F1F1F1" />
            },
            {
                label: "Sheriff loaned in",
                content: <SheriffLoanInIcon />
            },
            {
                label: "Sheriff loaned out",
                content: <SheriffLoanOutIcon />
            },
        ]
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {symbols.map(({ label, content }, index) => (
                    <SymbolDisplay label={label} key={index}>
                        {content}
                    </SymbolDisplay>
                ))}
            </div>
        );
    }
}