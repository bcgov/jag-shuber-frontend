// import * as React from 'react'
// import {
//     default as Timeline,
//     ReactCalendarTimelineGroup as TimelineGroupProps,
//     ReactCalendarTimelineItem as TimelineItemProps
// } from 'react-calendar-timeline/lib'
// import * as moment from 'moment'
// import { Sheriff, SheriffAssignment, SheriffAbility } from '../../../api/index';
// import TimelineCard from '../components/TimelineCard';
// import "./CalendarTimeline.css"
// import { connect } from 'react-redux';
// import { RootState } from '../../../store/reducers';
// import { selectors as sheriffSelectors, actions as sheriffActions } from '../../../modules/sheriffs'
// import { selectors as assignmentSelectors, actions as assignmentActions } from '../../../modules/assignments';
// import { visibleTime } from '../selectors';
// import { updateVisibleTime } from '../actions';
// import DroppableAssignmentRows from '../components/DroppableAssignmentRows'
// // import { linkAssignment, unlinkAssignment, swapAssignment } from '../../modules/assignments/actions';

// const UNASSIGNED_ID = -1;



// interface SheriffTimelineGroupProps extends Partial<TimelineGroupProps>, Partial<Sheriff> {

// }

// class SheriffTimelineGroup extends React.PureComponent<SheriffTimelineGroupProps>{
//     render() {
//         const { title } = this.props;
//         return (
//             <div>{title}</div>
//         )
//     }
// }

// interface CalendarTimelineProps {
//     groups: TimelineGroupProps[];
//     items: TimelineItemProps[];
//     visibleTimeStart?: any;
//     visibleTimeEnd?: any;
//     updateVisibleTime?: (visibleTime: { visibleTimeStart: any, visibleTimeEnd: any }) => void
//     getAssignments?: () => void;
//     getSheriffs?: () => void;
// }


// class CalendarTimeline extends React.PureComponent<CalendarTimelineProps> {
//     private _timelineRef: any;

//     private itemDropped() {
//         if (this._timelineRef) {
//             this._timelineRef.setState({ isDragging: false, dragStartPosition: null, dragLastPosition: null });
//         }
//     }

//     componentWillMount() {
//         const { getAssignments, getSheriffs } = this.props;
//         getAssignments && getAssignments();
//         getSheriffs && getSheriffs();
//     }

//     render() {
//         const {
//             groups,
//             items,
//             updateVisibleTime,
//             visibleTimeStart = moment().subtract(2, 'hour'),
//             visibleTimeEnd = moment().add(8, 'hour')
//         } = this.props;
//         return (
//             <Timeline
//                 groups={groups}
//                 items={items}
//                 visibleTimeStart={visibleTimeStart}
//                 visibleTimeEnd={visibleTimeEnd}
//                 onTimeChange={updateVisibleTime}
//                 canMove={false}
//                 canResize={false}
//                 canChangeGroup={false}
//                 stackItems={true}
//                 sidebarContent={<div style={{ paddingTop: "10%", paddingBottom: "10%", fontSize: 20, alignContent: "center" }}>Sheriff</div>}
//                 lineHeight={40}
//                 itemTouchSendsClick
//                 moveResizeValidator={(action, item, time) => {
//                     return item.start_time;
//                 }}
//                 onItemDoubleClick={(p) => {
//                     console.log(p);
//                 }}
//                 traditionalZoom
//                 itemHeightRatio={0.90}
//                 itemRenderer={({ item }: { item: TimelineItemProps & SheriffAssignment }) => {
//                     const { group, id, ...rest } = item;
//                     const assignment = Object.assign({ id: Math.floor(id) }, rest);
//                     return (
//                         <TimelineCard onDropped={() => this.itemDropped()} assignment={assignment} currentGroupId={group} />
//                     )
//                 }}
//                 groupRenderer={({ group }) => (
//                     <SheriffTimelineGroup {...group} />)
//                 }
//                 ref={(t) => {
//                     this._timelineRef = t;
//                 }}
//             >
//                 <DroppableAssignmentRows />
//             </Timeline>);
//     }
// }


// const mapStateToProps = (state: RootState, props: CalendarTimelineProps) => {
//     const allSheriffs = sheriffSelectors.sheriffs(state);
//     const assignments = assignmentSelectors.allAssignments(state);

//     // Create Timeline groups out of all sheriffs
//     const sheriffGroups : Partial<Sheriff & TimelineGroupProps>[] = allSheriffs.map(({ badgeNumber, firstName:name, ...restProps }) => {
//         return { id: badgeNumber, title: name, ...restProps }
//     });

//     // Add In a group for Unassigned tasks at the beginning of array
//     sheriffGroups.unshift({ id: UNASSIGNED_ID, title: "Unassigned", imageUrl: "", abilities: SheriffAbility.None });


//     const assignmentItems = assignments.reduce<TimelineItemProps[]>((flattened, assignment, index) => {
//         const { id, sheriffIds = [], startTime: start_time, endTime: end_time, ...restProps } = assignment;
//         // If no id's, it's unassigned
//         if (sheriffIds.length == 0) {
//             flattened.push({ id, group: UNASSIGNED_ID, start_time, end_time, sheriffIds, ...restProps } as TimelineItemProps);
//         } else {
//             // Here we map the multiple sheriffs that are linked with an assignment
//             // To different items that will be displayed on the Timeline
//             // In order to have a unique id for the numbers, we create a number in the form
//             // taskId.sheriffId
//             sheriffIds.map((gid) => (
//                 { id: Number(`${id}.${gid}`), group: gid, start_time, end_time, sheriffIds, ...restProps })
//             ).forEach(item => {
//                 flattened.push(item)
//             });
//         }
//         return flattened;
//     }, [])

//     const { visibleTimeStart, visibleTimeEnd } = visibleTime(state);

//     return {
//         groups: sheriffGroups,
//         items: assignmentItems,
//         visibleTimeStart,
//         visibleTimeEnd
//     };
// }

// export default connect<CalendarTimelineProps>(mapStateToProps,
//     {
//         updateVisibleTime,
//         getAssignments: assignmentActions.getAssignments,
//         getSheriffs: sheriffActions.getSheriffList
//     })(CalendarTimeline);


