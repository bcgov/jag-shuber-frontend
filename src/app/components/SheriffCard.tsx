import * as React from 'react';
import { Sheriff } from '../api/index';
import SheriffProfileDetailsModal from '../containers/SheriffProfileDetailsModal';

export interface SheriffCardProps {
    onClick: () => void;
    sheriff: Sheriff;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any>{

    render() {
        const { sheriff } = this.props;
        return (
            <div key={sheriff.badgeNumber} style={{ flex: "1 1 auto" }}>
                <SheriffProfileDetailsModal sheriff={sheriff} />
            </div>
        );
    }
}
