import * as React from 'react';
import SheriffCard from './SheriffCard';
import { Sheriff } from '../api';

export interface SheriffGridProps {
    sheriffs: Sheriff[];
    SheriffRenderer?: React.ReactType<Sheriff>;
}

class SheriffGrid extends React.PureComponent<SheriffGridProps, any>{
    render() {
        const {
            sheriffs,
            SheriffRenderer
        } = this.props;
        return (
            <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-around" }}>
                {sheriffs.map(sheriff => (
                    <div key={sheriff.badgeNumber}>
                        {SheriffRenderer && <SheriffRenderer {...sheriff} />}
                        {!SheriffRenderer && <SheriffCard sheriff={sheriff} onClick={() => alert(sheriff.badgeNumber)} />}
                    </div>
                ))}
            </div>
        )
    }
}

export default SheriffGrid;