import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { EscortRun } from '../api';
import { allRuns } from '../modules/assignments/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface RunListStateProps {
    runs: EscortRun[];
}

// Sort by sort order, we can make this configurable later if necessary
const sortByOrder = (a: any, b: any) => {
    if (a.hasOwnProperty('sortOrder') && b.hasOwnProperty('sortOrder')) {
        if (a.sortOrder < b.sortOrder) {
            return -1;
        } else if (b.sortOrder < a.sortOrder) {
            return 1;
        }
    }

    return 0;
};

class RunList extends React.PureComponent<
    SelectorProps & RunListStateProps> {

    render() {
        const { runs = [], ...restProps } = this.props;

        runs.sort(sortByOrder);

        const selectorValues = runs.map(run => ({ key: run.id, value: run.title }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        runs: allRuns(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<RunListStateProps, {}, SelectorProps>(
    mapStateToProps
)(RunList);
