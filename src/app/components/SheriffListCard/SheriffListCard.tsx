import * as React from 'react';
import { Sheriff } from '../../api/index';
import {
    ListGroupItem
} from 'react-bootstrap';
import SheriffRankDisplay from '../../containers/SheriffRankDisplay';
import './SheriffListCard.css';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
    disabled?: boolean;
}
export default class SheriffListCard extends React.PureComponent<SheriffListCardProps, {}> {
    render() {
        const { sheriff, disabled = false } = this.props;
        const { firstName, lastName, badgeNo, rankCode = '' } = sheriff;

        return (
            <ListGroupItem className={`sheriff-list-card drop-shadow-hover ${disabled ? 'not-active' : ''}`}>
                <span className="sheriff-card-badge-number">#{badgeNo}</span><br/>
                <SheriffRankDisplay code={rankCode} /><br/>
                <b style={{ fontSize: 16.5 }}>{lastName}, {firstName.charAt(0)}</b><br />
                {this.props.children}
            </ListGroupItem>
        );
    }
}
