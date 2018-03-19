import * as React from 'react';
import { Sheriff } from '../api/index';
import { 
    ListGroupItem
} from 'react-bootstrap';
import {
    default as ScheduleSummary,
    StatusEnum 
} from './ScheduleSummary/ScheduleSummary';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
    showScheduleSummary?: boolean;
}
export default class SheriffListCard extends React.PureComponent<SheriffListCardProps, any>{
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
            <div style={{width: 200, paddingTop: 4, paddingRight: 1.5, paddingLeft: 1.5}}>
                <ListGroupItem style={{borderColor: '#808080', borderWidth: 2, fontSize: 16}} >
                    {lastName}, {firstName.charAt(0)} 
                    <p style={{fontSize: 14}}>{badgeNumber}</p>
                    {showScheduleSummary &&  <ScheduleSummary weekStatus={testWeek}/>} 
                </ListGroupItem>
            </div>
        );
    }
}
