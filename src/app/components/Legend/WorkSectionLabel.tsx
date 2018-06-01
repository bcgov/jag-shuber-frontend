import * as React from 'react';
import { WorkSectionCode } from '../../api/Api';
import './Legend.css';
import { getWorkSectionColour } from '../../api/utils';
import { getForegroundColor } from '../../infrastructure/colorUtils';
import toTitleCase from '../../infrastructure/toTitleCase';

export interface WorkSectionLabelProps {
    workSectionId?: WorkSectionCode;
}

export default class WorkSectionLabel extends React.PureComponent<WorkSectionLabelProps> {
    render() {
        const { workSectionId } = this.props;
        const background = getWorkSectionColour(workSectionId);
        const foreground = getForegroundColor(background);
        const workSectionLabel = workSectionId ? toTitleCase(workSectionId) : 'N/A';
        return (
            <div 
                className="legend-work-section" 
                style={{
                    backgroundColor: background, 
                    color: foreground
                }}
            >
                {workSectionLabel}
            </div>
        );
    }
}