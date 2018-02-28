import * as React from 'react'
import {
    AssignmentDuty,
    Sheriff
} from '../api/index';
import SheriffDropTarget from '../containers/SheriffDropTarget';
import SheriffDutyBarList from './SheriffDutyBarList/SheriffDutyBarList';
import AssignmentDutyActionsPanel from './AssignmentDutyActionsPanel/AssignmentDutyActionsPanel';
import AssignmentDutyEditModal from '../containers/AssignmentDutyEditModal';
import WorkSectionIndicator from './WorkSectionIndicator/WorkSectionIndicator';
// import { WorkSectionId } from '../api/Api';

export interface AssignmentDutyCardProps {
    duty: AssignmentDuty
    canDropSheriff?: (sheriff: Sheriff) => boolean;
    onDropSheriff?: (sheriff: Sheriff) => void;
    SheriffAssignmentRenderer?: React.ComponentType<SheriffAssignmentRendererProps>
    // workSectionId: WorkSectionId;
}

export interface SheriffAssignmentRendererProps {
    sheriffIds: number[];
    sheriffsRequired: number;
}

export default class AssignmentDutyCard extends React.PureComponent<AssignmentDutyCardProps, any>{

    private canAssignSheriff(sheriff: Sheriff): boolean {
        const { sheriffIds = [] } = this.props.duty;
        return sheriff && !Number.isNaN(sheriff.badgeNumber)
            && sheriffIds.indexOf(sheriff.badgeNumber) == -1;
    }

    render() {
        const {
            canDropSheriff = (s: Sheriff) => this.canAssignSheriff(s),
            onDropSheriff,
            SheriffAssignmentRenderer = SheriffDutyBarList,
            duty: {
                id = -1,
                sheriffIds = [],
                sheriffsRequired = 0
            } = {},
            // workSectionId
        } = this.props;

        const backgroundColor = '#96c0e6';
        return (
            <SheriffDropTarget
                onDropItem={(s) => onDropSheriff && onDropSheriff(s)}
                canDropItem={canDropSheriff}
                style={{
                    backgroundColor,
                    flex: '1',
                    zindex: 70,
                    position: 'relative'
                }}
                computeStyle={!onDropSheriff ? (s: any) => ({}) : undefined}>
                <SheriffAssignmentRenderer
                    sheriffIds={sheriffIds}
                    sheriffsRequired={sheriffsRequired} />
                <AssignmentDutyActionsPanel>
                    <WorkSectionIndicator workSectionId='COURTS'/>
                    {/* <div style={{bottom:0, left:0, position:'relative'}}> */}
                        <AssignmentDutyEditModal dutyId={id} />
                    {/* </div> */}
                </AssignmentDutyActionsPanel>
            </SheriffDropTarget>
        )
    }
}

