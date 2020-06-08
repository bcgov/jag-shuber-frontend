import React from 'react';
import { connect } from 'react-redux';

import {
    Sheriff,
    IdType
} from '../api';

import SheriffListCard from '../components/SheriffListCard/SheriffListCard';
import SheriffProfileModal from './SheriffProfileModal';
import ScheduleSummary from './ScheduleSummary';

interface ConnectedSchedulingSheriffCardProps {
    sheriff: Sheriff;
}

interface ConnectedSchedulingSheriffCardDispatchProps {
    showSheriffProfileModal: (sheriffId: IdType) => void;
}

interface ConnectedSchedulingSheriffCardStateProps {}

class ConnectedSchedulingSheriffCard extends React.Component<ConnectedSchedulingSheriffCardProps
    & ConnectedSchedulingSheriffCardStateProps
    & ConnectedSchedulingSheriffCardDispatchProps> {
    render() {
        const {
            sheriff,
            showSheriffProfileModal
        } = this.props;

        return (
            <SheriffListCard
                sheriff={sheriff}
                onClick={() => {
                    showSheriffProfileModal(sheriff.id);
                }}
            >
                <div style={{ paddingLeft: 25 }}><ScheduleSummary sheriffId={sheriff.id} /></div>
            </SheriffListCard>
        );
    }
}

const mapDispatchToProps = {
    showSheriffProfileModal: SheriffProfileModal.ShowAction
};

// tslint:disable-next-line:max-line-length
export default connect<ConnectedSchedulingSheriffCardStateProps, ConnectedSchedulingSheriffCardDispatchProps, ConnectedSchedulingSheriffCardProps>
(undefined, mapDispatchToProps)(ConnectedSchedulingSheriffCard);
