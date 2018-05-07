import * as React from 'react';
import { connect } from 'react-redux';
import {
  Sheriff,
  IdType
} from '../api/index';
import { RootState } from '../store';
// import { default as SheriffGrid } from '../components/SheriffGrid';
import { getSheriffList } from '../modules/sheriffs/actions';
import {
  sheriffs,
  sheriffListLoading
} from '../modules/sheriffs/selectors';
import SheriffCard from '../components/SheriffCard';
import SheriffProfileModal from './SheriffProfileModal';

export interface SheriffListProps {
  getSheriffList?: any;
  sheriffs?: Sheriff[];
  loading?: boolean;
  SheriffListComponent?: React.ReactType<{ sheriffs?: Sheriff[], SheriffRenderer?: React.ReactType<Sheriff> }>;
  SheriffRenderer?: React.ReactType<Sheriff>;
}

interface SheriffListDispatchProps {
  showSheriffProfileModal: (id: IdType) => void;
}

type CompositeProps = SheriffListProps & SheriffListDispatchProps;
class SheriffList extends React.Component<CompositeProps> {
  componentWillMount() {
    // tslint:disable-next-line:no-shadowed-variable
    const { getSheriffList } = this.props;
    getSheriffList();
  }

  render() {
    const {
      // tslint:disable-next-line:no-shadowed-variable
      sheriffs = [],
      loading = true,
      // SheriffListComponent = SheriffGrid,
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
            onMouseDown={() => showSheriffProfileModal(sheriff.id)}
          >
            {SheriffRenderer && <SheriffRenderer {...sheriff} />}
            {!SheriffRenderer && <SheriffCard sheriff={sheriff} />}
          </div>
        ))}
      </div>
      // <SheriffListComponent 
      //   sheriffs={sheriffs} 
      //   SheriffRenderer={SheriffRenderer} 
      //   onClick={() => showSheriffProfileModal()}
      // />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    sheriffs: sheriffs(state),
    loading: sheriffListLoading(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSheriffList: () => dispatch(getSheriffList()),
    showSheriffProfileModal: (id: IdType) => SheriffProfileModal.ShowAction(id)
  };
};

export default connect<{}, SheriffListDispatchProps, SheriffListProps>(
  mapStateToProps,
  mapDispatchToProps
)(SheriffList);