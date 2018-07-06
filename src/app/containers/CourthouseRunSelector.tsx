import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Run } from '../api/index';
import { allRuns } from '../modules/courthouse/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface CourthouseRunListStateProps {
    runs: Run[];
}

class CourthouseRunList extends React.PureComponent<
    SelectorProps & CourthouseRunListStateProps> {

    render() {
        const { runs = [], ...restProps } = this.props;
        const selectorValues = runs.map(run => ({
            key: run.id, value: run.title
        }));
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
export default connect<CourthouseRunListStateProps, {}, SelectorProps>(
    mapStateToProps
)(CourthouseRunList);