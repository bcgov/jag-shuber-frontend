import * as React from 'react';
import './WorkSectionIndicator.css';
import { WorkSectionId } from '../../api/Api';

export interface WorkSectionIndicatorProps {
    workSectionId: WorkSectionId;
}

export default class WorkSectionIndicator extends React.PureComponent<WorkSectionIndicatorProps, any> {
    private getColour(workSectionId: WorkSectionId): string {
        let colour = 'blue';

        switch (workSectionId) {
            case "COURTS":
                colour = 'yellow';
                break;
            case "ESCORTS":
                colour = 'darkorange'
                break;
            case "JAIL":
                colour = 'purple';
                break;
            case "OTHER":
                colour = 'black';
                break;
        }
        return colour;
    }

    render() {
        const { workSectionId = 'OTHER' } = this.props
        return (
            <div className="work-section-indicator" style={{ borderTopColor: this.getColour(workSectionId) }}>
            </div>
        );
    }
}