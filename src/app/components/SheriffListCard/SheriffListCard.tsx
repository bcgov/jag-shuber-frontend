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
        const { firstName, lastName, badgeNo, rankCode = '', alias = 'D-15' } = sheriff;

        return (
            <ListGroupItem className={`sheriff-list-card drop-shadow-hover ${disabled ? 'not-active' : ''}`}>
                <span className="sheriff-card-badge-number">#{badgeNo}</span>
                <span className="sheriff-card-alias">{alias}</span><br />
                <SheriffRankDisplay code={rankCode} /><br/>
                <span className="sheriff-card-name">{lastName}, {firstName.charAt(0)}</span><br />
                {this.props.children}
            </ListGroupItem>
        );
    }
}
