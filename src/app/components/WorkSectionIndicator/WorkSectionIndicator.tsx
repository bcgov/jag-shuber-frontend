import * as React from 'react';
import './WorkSectionIndicator.css';
import { WorkSectionCode } from '../../api/Api';
import {
    getWorkSectionColour
} from '../../api/utils';
import { getForegroundColor } from '../../infrastructure/colorUtils';

export interface WorkSectionIndicatorProps {
    workSectionId?: WorkSectionCode;
    orientation?: 'top-left' | 'top-right' | 'bottom-right';
    includeCode?: boolean; 
}

export default class WorkSectionIndicator extends React.PureComponent<WorkSectionIndicatorProps, any> {
    render() {
        const { workSectionId, orientation = 'top-left', includeCode = true } = this.props;
        const workSectionColor = getWorkSectionColour(workSectionId);
        const foreground = getForegroundColor(workSectionColor);
        return (
            <div className={`work-section-indicator ${orientation}`}>
                <div 
                    className="work-section-flag"
                    style={{ borderTopColor: workSectionColor, borderBottomColor: workSectionColor }}
                />
                {includeCode && <div className="work-section-code" style={{ color: foreground }} >
                    {workSectionId && workSectionId.charAt(0)}
                </div>}
            </div>
        );
    }
}