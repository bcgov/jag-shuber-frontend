import * as React from 'react';
import { Sheriff } from '../api/index';
import { default as ViewSheriffProfileModal } from './ViewSheriffProfileModal';

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
