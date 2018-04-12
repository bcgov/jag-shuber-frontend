import * as React from 'react';
import {
    default as SheriffDutyBar,
    SheriffDutyBarProps
} from '../SheriffDutyBar/SheriffDutyBar';
import './SheriffDutyBarList.css';
import { SheriffAssignmentRendererProps } from '../AssignmentDutyCard/AssignmentDutyCard';
import { IdType } from '../../api/Api';

interface SheriffDutyBarListProps extends SheriffAssignmentRendererProps {
    onRemove?: (sheriffId: IdType) => void;
    BarRenderer?: React.ComponentType<SheriffDutyBarProps>;
}

export default class SheriffDutyBarList extends React.PureComponent<SheriffDutyBarListProps>{
    render() {
        const {
            sheriffDuties = [],
            sheriffsRequired = 0,
            onRemove,
            BarRenderer = SheriffDutyBar
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