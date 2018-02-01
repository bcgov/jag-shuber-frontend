import * as React from 'react'
import { default as AssignmentTimeline, UNASSIGNED_GROUP } from './AssignmentTimeline/AssignmentTimeline'
import { Sheriff, SheriffAssignment } from '../api/index';
import { ReactCalendarTimelineGroup } from 'react-calendar-timeline';
import SheriffDragSource from '../containers/SheriffDragSource';
import SheriffDropTarget from '../containers/SheriffDropTarget';
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import SheriffProfileDetails  from './SheriffProfileDetails';


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
        showHeader: true,
    };

    renderGroup(group: ReactCalendarTimelineGroup & Sheriff) {
        const isUnassignedGroup = group === UNASSIGNED_GROUP;

        if (isUnassignedGroup) {
            return <div className="text-danger bg-warning" ><strong>{group.title}</strong></div>;
        }

        const showProfileDetails = (
            <Popover id="popover-trigger-focus">
               <SheriffProfileDetails sheriff={group} isCompactView/>
            </Popover>
        );
        
        return (
            <SheriffDragSource
                 onDuty={this.props.onDuty} 
                 badgeNumber={group.badgeNumber}
                 style={{
                     backgroundColor:"#222222"
                 }}>
                <div>                
                    <strong>{group.title}</strong> #{group.badgeNumber} 
                    <OverlayTrigger trigger="focus" placement="right" overlay={showProfileDetails}>
                    <Button bsStyle="link" bsSize="small"><Glyphicon glyph="info-sign" /></Button>
                </OverlayTrigger>
                </div>
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
                <SheriffDropTarget
                    onDuty={onDuty}
                    style={{
                        position: 'absolute',
                        width: sidebarWidth,
                        height: "100%",
                        minHeight: 100,
                        top: 0,
                        left: 0,
                        float: 'left',
                        opacity: 0.2,
                        border: undefined
                    }}
                    computeStyle={({ isActive, isOver, canDrop }) => {
                        let backgroundColor = 'transparent'
                        if (isActive) {
                            backgroundColor = 'green'
                        } else if (canDrop) {
                            backgroundColor = 'lightGreen'
                        } else if (isOver && !canDrop) {
                            backgroundColor = '#FF000088'
                        }

                        return {
                            backgroundColor,
                            zIndex: canDrop ? 1000 : undefined
                        }
                    }}
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