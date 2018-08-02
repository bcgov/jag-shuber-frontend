import React from 'react';
import {
    default as SheriffDutyBar,
    SheriffDutyBarProps
} from '../SheriffDutyBar/SheriffDutyBar';
import './SheriffDutyBarList.css';
import { SheriffAssignmentRendererProps } from '../AssignmentDutyCard/AssignmentDutyCard';
import { 
    IdType,
    WorkSectionCode, 
    Sheriff,
    SheriffDuty
} from '../../api/Api';

interface SheriffDutyBarListProps extends SheriffAssignmentRendererProps {
    onRemove?: (sheriffId: IdType) => void;
    onDropSheriff?: (sheriff: Sheriff, sheriffDuty: SheriffDuty) => void;
    onDropSheriffDuty?: (sourceSheriffDuty: SheriffDuty, targetSheriffDuty: SheriffDuty) => void;
    BarRenderer?: React.ComponentType<SheriffDutyBarProps>;
    workSection?: WorkSectionCode;
}

export default class SheriffDutyBarList extends React.PureComponent<SheriffDutyBarListProps> {
    render() {
        const {
            sheriffDuties = [],
            sheriffsRequired = 0,
            onRemove,
            onDropSheriff,
            onDropSheriffDuty,
            BarRenderer = SheriffDutyBar,
            duty,
            workSection
        } = this.props;

        return (
            <div className="sheriff-duty-bar-list">
                {sheriffDuties.map((sheriffDuty, index) => {
                    const { id, sheriffId } = sheriffDuty;
                    const _onRemove = onRemove && id !== undefined ? () => onRemove(id) : undefined;
                    return (
                        <BarRenderer
                            key={id}
                            sheriffId={sheriffId}
                            sheriffDuty={sheriffDuty}
                            duty={duty}
                            dutyWorkSection={workSection}
                            onRemove={_onRemove}
                            onDropSheriff={onDropSheriff}
                            isExtra={index + 1 > sheriffsRequired}
                            showBorder={index + 1 !== sheriffDuties.length}
                            onDropSheriffDuty={onDropSheriffDuty}
                        />
                    );
                }
                )}
            </div>
        );
    }
}