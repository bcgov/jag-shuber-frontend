import React from 'react';
import { Sheriff } from '../../api';
import './SheriffDragCard.css';
import { Glyphicon } from 'react-bootstrap';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
    disabled?: boolean;
}
export default class SheriffDragCard extends React.PureComponent<SheriffListCardProps, {}> {
    render() {
        const { sheriff } = this.props;
        const {
            firstName,
            lastName
        } = sheriff;

        return (
            <div className="sheriff-drag-card">
               <Glyphicon glyph="user" style={{marginRight: 7, marginLeft: 10}}/> 
               <span>{lastName.toUpperCase()}, {firstName.charAt(0).toUpperCase()}</span>
            </div>
        );
    }
}
