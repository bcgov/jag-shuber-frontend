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
            showBorder = true,
            onRemove
        } = this.props;
        const isAssigned = sheriffId && !Number.isNaN(sheriffId)
        const title = !this.props.title ? (isAssigned ? `Sheriff #${sheriffId}` : "") : this.props.title.toUpperCase();
        // const backgroundColor = isAssigned ? (!isExtra ? 'green' : 'orange') : 'transparent';
        return (
            <div className="sheriff-duty-bar" style={{
                borderBottomWidth: showBorder ? 1 : 0,
            }}>
                {isAssigned && (
                    <div style={{ margin: 'auto', fontSize:16 }}>
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