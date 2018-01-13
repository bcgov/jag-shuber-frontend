
import * as React from "react"
import { OnDutyTimeline,OffDutyTimeline } from "../../modules/timeline";


class TimelinePage extends React.PureComponent {
    render() {
        return (
            <div>
                <OnDutyTimeline />
                <OffDutyTimeline />
            </div>
        );
    }
}

export default TimelinePage;


