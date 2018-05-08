import * as React from 'react';
import { connect } from 'react-redux';
import {
  Sheriff
} from '../api/index';
import { RootState } from '../store';
import { getSheriffList } from '../modules/sheriffs/actions';
import {
  sheriffs,
  sheriffListLoading
} from '../modules/sheriffs/selectors';
import SheriffCard from '../components/SheriffCard/SheriffCard';
import SheriffProfileModal from './SheriffProfileModal';

export interface SheriffListProps {
  sheriffs?: Sheriff[];
  loading?: boolean;
  SheriffListComponent?: React.ReactType<{ sheriffs?: Sheriff[], SheriffRenderer?: React.ReactType<Sheriff> }>;
  SheriffRenderer?: React.ReactType<Sheriff>;
}

interface SheriffListDispatchProps {
  showSheriffProfileModal: (sheriff: Sheriff) => void;
  fetchSheriffList: () => void;
}

type CompositeProps = SheriffListProps & SheriffListDispatchProps;
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
      showSheriffProfileModal
    } = this.props;

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (

      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
        {sheriffs.map(sheriff => (
          <div
            key={sheriff.badgeNo}
            onMouseDown={() => showSheriffProfileModal(sheriff)}
          >
            {SheriffRenderer && <SheriffRenderer {...sheriff} />}
            {!SheriffRenderer && <SheriffCard sheriff={sheriff} />}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    sheriffs: sheriffs(state),
    loading: sheriffListLoading(state)
  };
};

export default connect<{}, SheriffListDispatchProps, SheriffListProps>(
  mapStateToProps,
  {
    fetchSheriffList: getSheriffList,
    showSheriffProfileModal: SheriffProfileModal.ShowAction
  }
)(SheriffList);