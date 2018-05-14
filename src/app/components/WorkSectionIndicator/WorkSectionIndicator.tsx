import * as React from 'react';
import './WorkSectionIndicator.css';
import { WorkSectionCode } from '../../api/Api';
import {
    getWorkSectionColour
} from '../../api/utils';

export interface WorkSectionIndicatorProps {
    workSectionId?: WorkSectionCode;
    orientation?: 'top-left' | 'top-right';
}

export default class WorkSectionIndicator extends React.PureComponent<WorkSectionIndicatorProps, any> {
    render() {
        const { workSectionId, orientation = 'top-left' } = this.props;
        return (
            <div 
                className={`work-section-indicator ${orientation}`}
                style={{ borderTopColor: getWorkSectionColour(workSectionId) }}
            >
            {this.props.children}
            </div>
        );
    }
}