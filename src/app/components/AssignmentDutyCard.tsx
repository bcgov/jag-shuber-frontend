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

export interface AssignmentDutyCardProps {
    duty: AssignmentDuty
    canDropSheriff?: (sheriff: Sheriff) => boolean;
    onDropSheriff?: (sheriff: Sheriff) => void;
    SheriffAssignmentRenderer?: React.ComponentType<SheriffAssignmentRendererProps>
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
        } = this.props;

        const backgroundColor = '#2CB7BA';
        return (
            <SheriffDropTarget
                onDropItem={(s) => onDropSheriff && onDropSheriff(s)}
                canDropItem={canDropSheriff}
                style={{
                    borderWidth: 10,
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
                    <WorkSectionIndicator workSectionId='COURTS' />
                    <AssignmentDutyEditModal dutyId={id} />
                </AssignmentDutyActionsPanel>
            </SheriffDropTarget>
        )
    }
}

