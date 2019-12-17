import React from 'react';
// import { connect } from 'react-redux';
import {
  Sheriff, // IdType
} from '../api';
import { RootState } from '../store';
/*import { getSheriffList } from '../modules/sheriffs/actions';
import {
  sheriffsForCurrentLocation,
  sheriffListLoading
} from '../modules/sheriffs/selectors';*/

// import SheriffCard from '../components/SheriffCard/SheriffCard';
// import SheriffProfileModal from './SheriffProfileModal';
import SheriffListList from './SheriffListList';
import SheriffListGrid from './SheriffListGrid';
// import Loading from '../components/Loading';

export interface SheriffListProps {
  sheriffs?: Sheriff[];
  loading?: boolean;
  SheriffListComponent?: React.ReactType<{ sheriffs?: Sheriff[], SheriffRenderer?: React.ReactType<Sheriff> }>;
  SheriffRenderer?: React.ReactType<Sheriff>;
  sheriffsSelector?: (state: RootState) => Sheriff[];
}

export interface SheriffListStateProps {

}

/*interface SheriffListDispatchProps {
  showSheriffProfileModal: (sheriffId: IdType) => void;
  fetchSheriffList: () => void;
}*/

type CompositeProps = SheriffListProps & SheriffListStateProps;
class SheriffListComposable extends React.Component<CompositeProps> {
  /*componentWillMount() {
    const { fetchSheriffList } = this.props;
    fetchSheriffList();
  }*/

  render() {
    /*const {
      // sheriffs = [],
      loading = true,
      // SheriffRenderer,
      // showSheriffProfileModal
    } = this.props;

    if (loading) {
      return (
        <Loading />
      );
    }*/

    const displayAs: string = 'GRID';

    // TODO: We can use fragments now!
    /*return (
      <Fragment>
        {displayAs === 'LIST' && (
        <SheriffListList {...this.props} />
        )}

        {displayAs === 'GRID' && (
        <SheriffListGrid {...this.props} />
        )}
      </Fragment>
    );*/

    switch (displayAs) {
      case 'LIST':
        return <SheriffListList />;
      case 'GRID':
        return <SheriffListGrid />;
      default:
        return <SheriffListGrid />;
    }
  }
}

export default SheriffListComposable;

/*export default connect<SheriffListStateProps, SheriffListDispatchProps, SheriffListProps, RootState>(
  (state, {sheriffsSelector = sheriffsForCurrentLocation}) => ({
    sheriffs: sheriffsSelector(state),
    loading: sheriffListLoading(state)
  }),
  {
    fetchSheriffList: getSheriffList,
    showSheriffProfileModal: SheriffProfileModal.ShowAction
  }
)(SheriffList);*/
