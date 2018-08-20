import * as React from 'react';
import { Sheriff } from '../../api';
import {
    ListGroupItem
} from 'react-bootstrap';
// import SheriffRankDisplay from '../../containers/SheriffRankDisplay';
import './SheriffDragCard.css';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
    disabled?: boolean;
}
export default class SheriffDragCard extends React.PureComponent<SheriffListCardProps, {}> {
    render() {
        const { sheriff, disabled = false } = this.props;
        const { 
            firstName, 
            lastName, 
        //     badgeNo, 
        //     rankCode = '', 
        // alias = '' 
    } = sheriff;

        return (
            <ListGroupItem 
                className={`sheriff-drag-card drop-shadow-hover ${disabled ? 'not-active' : ''}`}
                >
                <span className="sheriff-card-name">
                    {lastName.toUpperCase()}, {firstName.charAt(0).toUpperCase()}
                </span><br />
                {this.props.children}
            </ListGroupItem>
        );
    }
}
