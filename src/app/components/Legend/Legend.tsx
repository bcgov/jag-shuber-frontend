import * as React from 'react';
import './Legend.css';
import WorkSectionLabel from './WorkSectionLabel';
import { WorkSectionCode } from '../../api/Api';
import Symbols from './Symbols';

export interface LegendProps {

}

export default class Legend extends React.PureComponent<LegendProps> {
    render() {
        const workSectionList: WorkSectionCode[] = ['COURTS', 'ESCORTS', 'JAIL', 'OTHER'];
        return (
            <div className="legend-background">
                <div className="legend"> 
                    <h1 style={{color: '#003366'}}>Legend</h1>
                    {workSectionList.map(wsc => <WorkSectionLabel key={`lenged_ws_${wsc}`} workSectionId={wsc}/>)}
                    <WorkSectionLabel key="lenged_ws_na"/>
                    <Symbols />
                </div>
            </div>
        );
    }
}