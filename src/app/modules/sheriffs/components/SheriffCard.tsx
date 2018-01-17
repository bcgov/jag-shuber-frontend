import * as React from 'react';
// import {
//     Grid,
//     Row,
//     Col,
//     Popover,
//     OverlayTrigger,
//     Button,
//     Glyphicon
// } from 'react-bootstrap';
import { Sheriff } from '../../../api/index';
import { default as ViewSheriffProfileModal } from './ViewSheriffProfileModal';
// import { default as LimitedSheriffProfileView } from './LimitedSheriffProfileView';

export interface SheriffCardProps {
    onClick: () => void;
    sheriff: Sheriff;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any>{

    render() {
        const { sheriff } = this.props;
        return (
            <ViewSheriffProfileModal sheriff={sheriff} />
        );
    }
}
