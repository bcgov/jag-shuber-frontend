import * as React from 'react'
import {
    default as SheriffDutyBar,
    SheriffDutyBarProps
} from '../SheriffDutyBar/SheriffDutyBar';
import './SheriffDutyBarList.css'
import { SheriffAssignmentRendererProps } from '../AssignmentDutyCard/AssignmentDutyCard';
import { IdType } from '../../api/Api';

interface SheriffDutyBarListProps extends SheriffAssignmentRendererProps {
    onRemove?: (sheriffId: IdType) => void;
    BarRenderer?: React.ComponentType<SheriffDutyBarProps>;
}

export default class SheriffDutyBarList extends React.PureComponent<SheriffDutyBarListProps>{
    render() {
        const {
            sheriffIds = [],
            sheriffsRequired = 0,
            onRemove,
            BarRenderer = SheriffDutyBar
        } = this.props;
        // Preallocate array so that we can show blanks if present
        const sheriffAssignments = new Array<IdType | undefined>(Math.max(sheriffIds.length, sheriffsRequired));
        let size = sheriffAssignments.length;
        while (size--) {
            sheriffAssignments[size] = undefined;
        }
        // Add in the actual assigned items
        sheriffIds.forEach((id, index) => sheriffAssignments[index] = id);

        return (
            <div className="sheriff-duty-bar-list">
                {sheriffAssignments.map((id, index) => {
                    const _onRemove = onRemove && id !== undefined ? () => onRemove(id) : undefined;
                    return (
                        <BarRenderer
                            key={id}
                            sheriffId={id}
                            onRemove={_onRemove}
                            isExtra={index + 1 > sheriffsRequired}
                            showBorder={index + 1 != sheriffAssignments.length}
                        />
                    );
                }
                )}
            </div>
        )
    }
}