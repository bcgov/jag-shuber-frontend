import * as React from 'react';
import { connect } from 'react-redux';
import { Sheriff } from '../api/index';
import { RootState } from '../store';
import { default as SheriffGrid } from '../components/SheriffGrid';
import { getSheriffList } from '../modules/sheriffs/actions';
import {
  sheriffs,
  sheriffListLoading
} from '../modules/sheriffs/selectors';

export interface SheriffListProps {
  getSheriffList: any;
  sheriffs: Sheriff[];
  loading: boolean;
  SheriffListComponent?: React.ReactType<{ sheriffs?: Sheriff[], SheriffRenderer?: React.ReactType<Sheriff> }>;
  SheriffRenderer?: React.ReactType<Sheriff>;
}

class SheriffList extends React.Component<SheriffListProps, any> {
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
      SheriffListComponent = SheriffGrid,
      SheriffRenderer
    } = this.props;

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <SheriffListComponent sheriffs={sheriffs} SheriffRenderer={SheriffRenderer} />
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
    getSheriffList: () => dispatch(getSheriffList())
  };
};

const ConnectedOnDutySherrifs = connect(
  mapStateToProps,
  mapDispatchToProps
)(SheriffList);

export default ConnectedOnDutySherrifs;