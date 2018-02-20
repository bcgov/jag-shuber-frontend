import * as React from "react"
import DailyTimeline from "../containers/DailyTimeline/DailyTimeline";
import TimelineToolsPanel from "../components/TimelineToolsPanel";
import SheriffList from "../containers/SheriffList";
import { Sheriff } from "../api";
import SheriffListCard from "../components/SheriffListCard";


class TimelinePage extends React.PureComponent {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: "1 0px", minWidth: 500 }}>
                    <DailyTimeline />
                </div>
                <TimelineToolsPanel titleText="Sheriffs" legendChildren={<div>Hello Legend</div>}>
                    <SheriffList SheriffRenderer={(s:Sheriff)=><SheriffListCard sheriff={s}/>}/>
                </TimelineToolsPanel>
            </div>
        );
    }
}

export default TimelinePage;


