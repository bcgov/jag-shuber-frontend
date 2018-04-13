import * as React from 'react';
import './WorkSectionIndicator.css';
import { WorkSectionCode } from '../../api/Api';
import {
    getWorkSectionColour
} from '../../api/utils';

export interface WorkSectionIndicatorProps {
    workSectionId: WorkSectionCode;
}

export default class WorkSectionIndicator extends React.PureComponent<WorkSectionIndicatorProps, any> {
    render() {
        const { workSectionId = 'OTHER' } = this.props;
        return (
            <div 
                className="work-section-indicator" 
                style={{ borderTopColor: getWorkSectionColour(workSectionId) }}
            />
        );
    }
}