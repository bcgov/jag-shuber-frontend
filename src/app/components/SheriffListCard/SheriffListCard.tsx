import * as React from 'react';
import * as moment from 'moment';
import { Sheriff } from '../../api/index';
import {
    ListGroupItem
} from 'react-bootstrap';
import ScheduleSummary from '../../containers/ScheduleSummary';
import './SheriffListCard.css';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
    showScheduleSummary?: boolean;
}
export default class SheriffListCard extends React.PureComponent<SheriffListCardProps, {}> {
    render() {
        const { sheriff, showScheduleSummary = false } = this.props;
        const { firstName, lastName, badgeNumber, id } = sheriff;

        return (
            <ListGroupItem className="sheriff-list-card" >
                {lastName}, {firstName.charAt(0)}
                <p className="sheriff-card-badge-number">{badgeNumber}</p>
                {showScheduleSummary &&
                    <ScheduleSummary
                        sheriffId={id}
                        start={moment().startOf('week')}
                        end={moment().endOf('week')}
                    />}
            </ListGroupItem>
        );
    }
}
