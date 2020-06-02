import React from 'react';
import { connect } from 'react-redux';

import { ListGroup } from 'react-bootstrap';

import {
  Sheriff, IdType
} from '../api';

import { RootState } from '../store';

import { getSheriffList as getSheriffs } from '../modules/sheriffs/actions';
import { getSheriffLocations } from '../modules/sheriffLocations/actions';

import {
  sheriffsForCurrentLocation,
  sheriffListLoading
} from '../modules/sheriffs/selectors';

import Loading from '../components/Loading';
import SheriffListCard from '../components/SheriffListCard/SheriffListCard';
import SheriffProfileModal from './SheriffProfileModal';

export interface SheriffListProps {
  sheriffs?: Sheriff[];
  loading?: boolean;
  SheriffListComponent?: React.ReactType<{ sheriffs?: Sheriff[], SheriffRenderer?: React.ReactType<Sheriff> }>;
  SheriffRenderer?: React.ReactType<Sheriff>;
  sheriffsSelector?: (state: RootState) => Sheriff[];
}

export interface SheriffListStateProps {}

interface SheriffListDispatchProps {
  showSheriffProfileModal: (sheriffId: IdType) => void;
  fetchSheriffs: () => void;
  fetchSheriffLocations: () => void;
}

type CompositeProps = SheriffListProps & SheriffListDispatchProps & SheriffListStateProps;
class SheriffList extends React.Component<CompositeProps> {
  componentWillMount() {
    const { fetchSheriffs, fetchSheriffLocations } = this.props;
    fetchSheriffs();
    fetchSheriffLocations();
  }

  render() {
    const {
      sheriffs = [],
      loading = true,
      SheriffRenderer,
      showSheriffProfileModal
    } = this.props;

    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <div style={{ display: 'flex', flexFlow: 'column wrap', justifyContent: 'center' }}>
        {sheriffs.map(sheriff => (
          <div
            key={sheriff.badgeNo}
          >
            {SheriffRenderer && <SheriffRenderer {...sheriff} />}
            {!SheriffRenderer &&
              <ListGroup>
                <SheriffListCard sheriff={sheriff} onClick={() => showSheriffProfileModal(sheriff.id)}>
                  {/*<div style={{ paddingLeft: 25 }}><ScheduleSummary sheriffId={s.id} /></div>*/}
                </SheriffListCard>
              </ListGroup>
            }
          </div>
        ))}
      </div>
    );
  }
}

export default connect<SheriffListStateProps, SheriffListDispatchProps, SheriffListProps, RootState>(
  (state, {sheriffsSelector = sheriffsForCurrentLocation}) => ({
    sheriffs: sheriffsSelector(state),
    loading: sheriffListLoading(state)
  }),
  {
    fetchSheriffs: getSheriffs,
    fetchSheriffLocations: getSheriffLocations,
    showSheriffProfileModal: SheriffProfileModal.ShowAction
  }
)(SheriffList);
