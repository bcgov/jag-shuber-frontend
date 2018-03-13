import * as React from 'react';
import {
    AssignmentDuty,
    Sheriff
} from '../api/index';
import SheriffDropTarget from '../containers/SheriffDropTarget';
import SheriffDutyBarList from './SheriffDutyBarList/SheriffDutyBarList';
import AssignmentDutyActionsPanel from './AssignmentDutyActionsPanel/AssignmentDutyActionsPanel';
import AssignmentDutyEditModal from '../containers/AssignmentDutyEditModal';

export interface AssignmentDutyCardProps {
    duty: AssignmentDuty;
    canDropSheriff?: (sheriff: Sheriff) => boolean;
    onDropSheriff?: (sheriff: Sheriff) => void;
    SheriffAssignmentRenderer?: React.ComponentType<SheriffAssignmentRendererProps>;
    style?: React.CSSProperties;
}

export interface SheriffAssignmentRendererProps {
    sheriffIds: number[];
    sheriffsRequired: number;
}

export default class AssignmentDutyCard extends React.PureComponent<AssignmentDutyCardProps, {}> {

    private canAssignSheriff(sheriff: Sheriff): boolean {
        const { sheriffIds = [] } = this.props.duty;
        return sheriff && !Number.isNaN(sheriff.badgeNumber)
            && sheriffIds.indexOf(sheriff.badgeNumber) === -1;
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
            
            style = {}
        } = this.props;

        return (
            <SheriffDropTarget
                onDropItem={(s) => onDropSheriff && onDropSheriff(s)}
                canDropItem={canDropSheriff}
                style={{
                    backgroundColor: '#96c0e6',
                    flex: '1',
                    zindex: 70,
                    position: 'relative',
                    ...style

                }}
                computeStyle={!onDropSheriff ? (s: {}) => ({}) : undefined}>
                <SheriffAssignmentRenderer
                    sheriffIds={sheriffIds}
                    sheriffsRequired={sheriffsRequired} 
                />
                <AssignmentDutyActionsPanel>
                    <AssignmentDutyEditModal dutyId={id} />
                </AssignmentDutyActionsPanel>
            </SheriffDropTarget>
        );
    }
}