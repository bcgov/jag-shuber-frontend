import React from 'react';
import SheriffDragSource from './SheriffDragSource';
import DutyRosterSheriffCard from './DutyRosterSheriffCard';
import { updateDraggingSheriff } from '../modules/dutyRoster/actions';
import { Sheriff, IdType } from '../api/Api';
import { connect } from 'react-redux';
import { RootState } from '../store';

export interface DutyRosterSheriffProps {
    sheriff: Sheriff;
}

export interface DutyRosterSheriffDispatchProps {
    setDraggingSheriff: (sheriffId?: IdType) => void;
}

class DutyRosterSheriff extends React.PureComponent<DutyRosterSheriffProps & DutyRosterSheriffDispatchProps, any> {
    render() {
        const { sheriff, setDraggingSheriff } = this.props;
        return (
            <SheriffDragSource
                sheriff={sheriff}
                beginDrag={() => setDraggingSheriff(sheriff.id)}
                endDrag={() => setDraggingSheriff()}
            >
                <DutyRosterSheriffCard
                    sheriff={sheriff}
                />
            </SheriffDragSource>
        );
    }
}

export default connect<{}, DutyRosterSheriffDispatchProps, DutyRosterSheriffProps, RootState>(
    undefined,
    {
        setDraggingSheriff: updateDraggingSheriff
    }
)(DutyRosterSheriff);