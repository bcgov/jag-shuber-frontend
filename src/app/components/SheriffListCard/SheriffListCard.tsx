import * as React from 'react';
import { Sheriff } from '../../api/index';
import { 
    ListGroupItem
} from 'react-bootstrap';
import {
    default as ScheduleSummary,
    StatusEnum 
} from '../ScheduleSummary/ScheduleSummary';
import './SheriffListCard.css';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
    showScheduleSummary?: boolean;
}
export default class SheriffListCard extends React.PureComponent<SheriffListCardProps, {}> {
    render() {
        const { sheriff, showScheduleSummary = false } = this.props;
        const { firstName, lastName, badgeNumber } = sheriff;
        const testWeek = {
            sunday: StatusEnum.HIDDEN,
            monday: StatusEnum.EMPTY,
            tuesday: StatusEnum.GOOD,
            wednesday: StatusEnum.EMPTY,
            thursday: StatusEnum.BAD,
            friday: StatusEnum.WARNING,
            saturday: StatusEnum.HIDDEN
        };
        return (
            <div className="sheriff-list-card">
                <ListGroupItem className="sheriff-list-card-item" >
                    {lastName}, {firstName.charAt(0)} 
                    <p className="sheriff-card-badge-number">{badgeNumber}</p>
                    {showScheduleSummary &&  <ScheduleSummary weekStatus={testWeek}/>} 
                </ListGroupItem>
            </div>
        );
    }
}
