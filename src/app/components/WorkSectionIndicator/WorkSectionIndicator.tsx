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
            colour = '#2CB7BA';
                break;
            case "ESCORTS":
                colour = '#F3BD48'
                break;
            case "JAIL":
                colour = '#804A86';
                break;
            case "OTHER":
                colour = "#B74343"
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