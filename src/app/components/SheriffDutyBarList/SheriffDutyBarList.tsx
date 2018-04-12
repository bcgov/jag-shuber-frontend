import * as React from 'react';
import {
    default as SheriffDutyBar,
    SheriffDutyBarProps
} from '../SheriffDutyBar/SheriffDutyBar';
import './SheriffDutyBarList.css';
import { SheriffAssignmentRendererProps } from '../AssignmentDutyCard/AssignmentDutyCard';
import { 
    IdType,
    WorkSectionCode 
} from '../../api/Api';

interface SheriffDutyBarListProps extends SheriffAssignmentRendererProps {
    onRemove?: (sheriffId: IdType) => void;
    BarRenderer?: React.ComponentType<SheriffDutyBarProps>;
    dutyWorkSection?: WorkSectionCode;
}

export default class SheriffDutyBarList extends React.PureComponent<SheriffDutyBarListProps> {
    render() {
        const {
            sheriffDuties = [],
            sheriffsRequired = 0,
            onRemove,
            BarRenderer = SheriffDutyBar,
            duty,
            dutyWorkSection
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
                            dutyWorkSection={dutyWorkSection}
                            onRemove={_onRemove}
                            isExtra={index + 1 > sheriffsRequired}
                            showBorder={index + 1 !== sheriffDuties.length}
                        />
                    );
                }
                )}
            </div>
        )
    }
}