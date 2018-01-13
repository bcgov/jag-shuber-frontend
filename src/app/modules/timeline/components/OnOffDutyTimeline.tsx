import * as React from 'react'
import { AssignmentTimeline } from '../../assignments/components/AssignmentTimeline'
import { Sheriff, SheriffAssignment } from '../../../api/index';
import { ReactCalendarTimelineGroup } from 'react-calendar-timeline';
import SheriffDragSource from '../../sheriffs/dragdrop/SheriffDragSource';
import SheriffDropTarget from '../../sheriffs/dragdrop/SheriffDropTarget';

interface OnOffDutyTimelineProps {
    sidebarWidth?: number,
    onDuty: boolean
    sheriffs: Sheriff[];
    assignments: SheriffAssignment[];
    showHeader?: boolean;
    sideBarHeaderTitle?: string;
}

export default class OnOffDutyTimeline extends React.PureComponent<OnOffDutyTimelineProps> {
    static defaultProps = {
        sidebarWidth: 150,
        showHeader: true
    };

    renderGroup(group: ReactCalendarTimelineGroup & Sheriff) {
        return (
            <SheriffDragSource onDuty badgeNumber={group.badgeNumber}>
                <div>{group.title}</div>
            </SheriffDragSource>
        )
    }

    render() {
        const {
            sheriffs,
            assignments,
            onDuty,
            sidebarWidth,
            showHeader,
            sideBarHeaderTitle,
            ...rest } = this.props;
        return (
            <div style={{ position: 'relative' }}>
                <SheriffDropTarget onDuty={onDuty} style={{
                    position: 'absolute',
                    width: sidebarWidth,
                    height: "100%",
                    minHeight: 40,
                    top: 0,
                    left: 0,
                    float: 'left',
                    opacity: 0.2,
                    border:undefined
                }}
                    computeStyle={({ isActive, isOver, canDrop }) => (
                        {
                            backgroundColor: canDrop ? 'orange' : 'transparent',
                            zIndex: canDrop ? 1000 : undefined
                        }
                    )}
                />
                <AssignmentTimeline
                    sidebarWidth={sidebarWidth}
                    showUnlinkedAssignments={onDuty}
                    showHeader={showHeader}
                    sideBarHeaderTitle={sideBarHeaderTitle}
                    items={assignments}
                    groups={sheriffs}
                    groupRenderer={(g) => this.renderGroup(g)}
                    {...rest}
                />
            </div>
        )
    }
}