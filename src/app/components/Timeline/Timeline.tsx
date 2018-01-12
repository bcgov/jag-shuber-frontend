// import * as React from 'react'
// import {
//     default as Timeline,
//     ReactCalendarTimelineExtension as TimelineExtensionProps,
//     ReactCalendarTimelineGroup as GroupProps,
//     //ReactCalendarTimelineItem as ItemProps    
// } from 'react-calendar-timeline/lib'
// import * as moment from 'moment'
// import { Sheriff, SheriffAssignment, SheriffAbility } from '../../api/index';
// import DropTimelineRow from '../../modules/assignments/components/DropTimelineRow';
// import TimelineCard from '../../modules/assignments/components/TimelineCard';
// import "./CalendarTimeline.css"

// export default class CalendarTimeline extends React.PureComponent {

//     render() {
//         const groups = [
//             { id: 1, title: 'Matt Wilson' },
//             { id: 2, title: 'Ronda Teaky' }
//         ]

//         const items = [
//             {
//                 id: 1, group: 1, title: 'Serving Papers', start_time: moment(), end_time: moment().add(1, 'hour'),
//                 itemProps: {
//                 }
//             },
//             { id: 2, group: 2, title: 'Prisoner Transfer', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour') },
//             { id: 3, group: 1, title: 'Court Security', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour') }
//         ]

//         return (
//             <Timeline groups={groups}
//                 items={items}
//                 defaultTimeStart={moment().add(-12, 'hour')}
//                 defaultTimeEnd={moment().add(12, 'hour')}
//                 canMove={false}
//                 canResize={false}
//                 canChangeGroup={false}
//                 stackItems={true}
//                 sidebarContent={<div style={{ paddingTop: "10%", paddingBottom: "10%", fontSize: 20, alignContent: "center" }}>Sheriff</div>}
//                 lineHeight={40}
//                 moveResizeValidator={(action, item, time) => {
//                     return item.start_time;
//                 }}
//                 onItemMove={(item, dragTime, newGroup) => {
//                     console.log(item, dragTime, newGroup);
//                 }}
//                 itemHeightRatio={0.90}
//                 itemRenderer={({ item }) => {
//                     let task: SheriffAssignment = {
//                         id: item.id,
//                         title: item.title as string,
//                         description: "No Description",
//                         requiredAbilities: SheriffAbility.All,
//                         sheriffIds: []
//                     }
//                     return (
//                         <TimelineCard task={task} />
//                     )
//                 }}
//                 groupRenderer={({ group }) => (
//                     <SheriffTimelineGroup {...group} />)
//                 }
//             >
//                 <DroppableRegions />
//             </Timeline>);
//     }
// }