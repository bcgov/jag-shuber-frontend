import * as React from 'react'
import {
    AssignmentDuty, Sheriff
} from '../api/index';
import SheriffDropTarget from '../containers/SheriffDropTarget';

export interface AssignmentDutyCardProps {
    duty: AssignmentDuty
    canDropSheriff?: (sheriff: Sheriff) => boolean;
    onDropSheriff?: (sheriff: Sheriff) => void;
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
                {this.props.children}
            </SheriffDropTarget>
        )
    }
}

