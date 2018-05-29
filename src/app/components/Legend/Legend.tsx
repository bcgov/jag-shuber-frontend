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
                    <span className="legend-title">Legend</span>
                    <div className="legend-work-section-group">                  
                        {workSectionList.map(wsc => <WorkSectionLabel key={`lenged_ws_${wsc}`} workSectionId={wsc} />)}
                        <WorkSectionLabel key="lenged_ws_na" />
                    </div>
                    <Symbols />
                </div>
            </div>
        );
    }
}