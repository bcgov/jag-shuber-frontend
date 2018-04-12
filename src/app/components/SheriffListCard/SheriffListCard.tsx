import * as React from 'react';
import { Sheriff } from '../../api/index';
import {
    ListGroupItem
} from 'react-bootstrap';
import './SheriffListCard.css';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
    disabled?: boolean;
}
export default class SheriffListCard extends React.PureComponent<SheriffListCardProps, {}> {
    render() {
        const { sheriff, disabled = false } = this.props;
        const { firstName, lastName, badgeNo} = sheriff;

        return (
            <ListGroupItem className={`sheriff-list-card ${disabled ? 'not-active' : ''}`}>
                <b>{lastName}, {firstName.charAt(0)}</b>
                <p className="sheriff-card-badge-number">{badgeNo}</p>
                {this.props.children}
            </ListGroupItem>
        );
    }
}
