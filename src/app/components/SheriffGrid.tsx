import * as React from 'react';
import SheriffCard from './SheriffCard';
import { Sheriff } from '../api/index';

export interface SherriffGridProps {
    sheriffs: Sheriff[];
}

class SheriffGrid extends React.PureComponent<SherriffGridProps, any>{
    render() {
        const { sheriffs } = this.props;
        return (
            <div style={{ display: "flex", flexFlow:"row wrap", justifyContent:"space-around"}}>

                {sheriffs.map(sheriff => (
                    <div key={sheriff.badgeNumber} style={{flex:"1 1 auto"}}>
                    <SheriffCard sheriff={sheriff} onClick={() => alert(sheriff.badgeNumber)} />
                    </div>
                ))}

            </div>
        )
    }
}

export default SheriffGrid;