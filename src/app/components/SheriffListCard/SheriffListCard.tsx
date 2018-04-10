import * as React from 'react';
import * as moment from 'moment';
import { Sheriff } from '../../api/index';
import {
    ListGroupItem
} from 'react-bootstrap';
import ScheduleSummary from '../../containers/ScheduleSummary';
import ShiftSummary from '../../containers/ShiftSummary';
import './SheriffListCard.css';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
    showScheduleSummary?: boolean;
    hasShift?: boolean;
}
export default class SheriffListCard extends React.PureComponent<SheriffListCardProps, {}> {
    render() {
        const { sheriff, showScheduleSummary = false, hasShift = true } = this.props;
        const { firstName, lastName, badgeNumber, id } = sheriff;
        const cardColor = (!showScheduleSummary && !hasShift) ? '#CDCDCD' : '';

        return (
            <ListGroupItem className="sheriff-list-card" style={{backgroundColor: cardColor}}>
                <b>{lastName}, {firstName.charAt(0)}</b>
                <p className="sheriff-card-badge-number">{badgeNumber}</p>
                {showScheduleSummary &&
                    <ScheduleSummary
                        sheriffId={id}
                        start={moment().startOf('week')}
                        end={moment().endOf('week')}
                    />}
                {!showScheduleSummary && 
                    <div style={{fontSize: 14}}>
                        <ShiftSummary sheriffId={id} date={moment().toISOString()}/>
                    </div>}
            </ListGroupItem>
        );
    }
}
