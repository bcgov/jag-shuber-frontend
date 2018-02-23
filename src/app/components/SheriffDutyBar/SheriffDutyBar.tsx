import * as React from 'react'
import {
    Glyphicon,
    Label
} from 'react-bootstrap'
import './SheriffDutyBar.css'
import { IdType } from '../../api';


export interface SheriffDutyBarProps {
    sheriffId?: IdType;
    title?: string;
    isExtra?: boolean;
    showBorder?: boolean;
    onRemove?: () => void;
}

export default class SheriffDutyBar extends React.PureComponent<SheriffDutyBarProps>{
    render() {
        const {
            sheriffId,
            isExtra = false,
            showBorder = true,
            onRemove
        } = this.props;
        const isAssigned = sheriffId && !Number.isNaN(sheriffId)
        const title = !this.props.title ? (isAssigned ? `Sheriff #${sheriffId}` : "") : this.props.title;
        const backgroundColor = isAssigned ? (!isExtra ? 'green' : 'orange') : 'transparent';
        return (
            <div className="sheriff-duty-bar" style={{
                backgroundColor,
                borderBottomWidth: showBorder ? 1 : 0,
            }}>
                {isAssigned && (
                    <div style={{ margin: 'auto' }}>
                        {title}
                        {onRemove !== undefined && (
                            <Label
                                className="remove-assignment-btn"
                                bsSize="xs"
                                onMouseDown={() => onRemove && onRemove()}
                                bsStyle="danger">
                                <Glyphicon glyph="remove" />
                            </Label>
                        )}
                    </div>
                )}
            </div>
        )
    }
}