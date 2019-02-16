import React from 'react';
import {
    default as SheriffDutyBar,
    SheriffDutyBarProps
} from '../SheriffDutyBar/SheriffDutyBar';
import {
    default as SheriffUnassignedBar,
    SheriffUnassignedBarProps
} from '../SheriffUnassignedBar/SheriffUnassignedBar';
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
    UnassignedBarRenderer?: React.ComponentType<SheriffUnassignedBarProps>;
    workSection?: WorkSectionCode;
}

export default class SheriffDutyBarList extends React.PureComponent<SheriffDutyBarListProps> {
    render() {
        const {
            sheriffDuties = [],
            onRemove,
            onDropSheriff,
            onDropSheriffDuty,
            BarRenderer = SheriffDutyBar,
            UnassignedBarRenderer = SheriffUnassignedBar,
            duty,
            workSection,
            unassignedTimeRanges = { }
        } = this.props;

        return (
            <div className="sheriff-duty-bar-list">
                {sheriffDuties.map((sheriffDuty, index) => {
                    const { id, sheriffId } = sheriffDuty;
                    const _onRemove = onRemove && id !== undefined ? () => onRemove(id) : undefined;
                    return (
                        <div key={`sheriffDutyBarItem_${index}_${id}`}>
                            <BarRenderer
                                key={id}
                                sheriffId={sheriffId}
                                sheriffDuty={sheriffDuty}
                                duty={duty}
                                dutyWorkSection={workSection}
                                onRemove={_onRemove}
                                onDropSheriff={onDropSheriff}                            
                                onDropSheriffDuty={onDropSheriffDuty}                            
                            />
                            {(unassignedTimeRanges[sheriffDuty.sheriffId!] || []).map((timeRange, index) => {
                                return (
                                    <UnassignedBarRenderer
                                        key={`unassigned_${index}_${id}`}
                                        unassignedTimeRange={timeRange}
                                        sheriffDuty={sheriffDuty}
                                        duty={duty}
                                        dutyWorkSection={workSection}
                                    />
                                );
                            })}
                        </div>
                    );
                }
                )}
            </div>
        );
    }
}