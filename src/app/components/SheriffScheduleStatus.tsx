import * as React from 'react';
import { Sheriff } from '../api/index';

export interface SheriffScheduleStatusProps {
    sheriff: Sheriff;
}

export default class SheriffScheduleStatus extends React.Component<SheriffScheduleStatusProps, any>{
    render() {
        const{ sheriff: {onDuty} } = this.props;
        return (
            <div>
                <h3>Schedule</h3>
                { onDuty && <div><strong className="text-success">On Duty</strong> - Off duty at 7:00 PM</div> }
                { !onDuty && <div><strong className="text-danger">Off Duty</strong> - On duty at 7:00 AM</div> }
                
            </div>
        );
    }
}