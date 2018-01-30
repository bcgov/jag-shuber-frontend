import * as React from 'react';
import { Sheriff } from '../api/index';
import { default as SheriffProfileViewModal } from './SheriffProfileViewModal';

export interface SheriffCardProps {
    onClick: () => void;
    sheriff: Sheriff;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any>{

    render() {
        const { sheriff } = this.props;
        return (
            <SheriffProfileViewModal sheriff={sheriff} />
        );
    }
}
