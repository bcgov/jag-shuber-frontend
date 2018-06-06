import * as React from 'react';
import { connect } from 'react-redux';
import {
  Sheriff, IdType
} from '../api/index';
import { RootState } from '../store';
import { getSheriffList } from '../modules/sheriffs/actions';
import {
  sheriffs,
  sheriffListLoading,
  sheriffLoanMap
} from '../modules/sheriffs/selectors';
import SheriffCard from '../components/SheriffCard/SheriffCard';
import SheriffProfileModal from './SheriffProfileModal';
import { MapType } from '../api/Api';

export interface SheriffListProps {
  sheriffs?: Sheriff[];
  loading?: boolean;
  SheriffListComponent?: React.ReactType<{ sheriffs?: Sheriff[], SheriffRenderer?: React.ReactType<Sheriff> }>;
  SheriffRenderer?: React.ReactType<Sheriff>;
}

export interface SheriffListStateProps {
  sheriffLoanMap?: MapType<{isLoanedIn: boolean, isLoanedOut: boolean}>;
}

interface SheriffListDispatchProps {
  showSheriffProfileModal: (sheriffId: IdType) => void;
  fetchSheriffList: () => void;
}

type CompositeProps = SheriffListProps & SheriffListDispatchProps & SheriffListStateProps;
class SheriffList extends React.Component<CompositeProps> {
  componentWillMount() {
    // tslint:disable-next-line:no-shadowed-variable
    const { fetchSheriffList } = this.props;
    fetchSheriffList();
  }

  render() {
    const {
      // tslint:disable-next-line:no-shadowed-variable
      sheriffs = [],
      loading = true,
      SheriffRenderer,
      showSheriffProfileModal,
      // tslint:disable-next-line:no-shadowed-variable
      sheriffLoanMap = {}
    } = this.props;

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        {sheriffs.map(sheriff => (
          <div
            key={sheriff.badgeNo}
          >
            {SheriffRenderer && <SheriffRenderer {...sheriff} />}
            {!SheriffRenderer && 
              <SheriffCard 
                sheriff={sheriff} 
                onClick={() => showSheriffProfileModal(sheriff.id)}
                isLoanedIn={sheriffLoanMap[sheriff.id].isLoanedIn}
                isLoanedOut={sheriffLoanMap[sheriff.id].isLoanedOut}
              />
            }
          </div>
        ))}
      </div>
    );
  }
}

export default connect<SheriffListStateProps, SheriffListDispatchProps, SheriffListProps, RootState>(
  (state, props) => ({
    sheriffs: sheriffs(state),
    loading: sheriffListLoading(state),
    sheriffLoanMap: sheriffLoanMap(state)
  }),
  {
    fetchSheriffList: getSheriffList,
    showSheriffProfileModal: SheriffProfileModal.ShowAction
  }
)(SheriffList);