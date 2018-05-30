import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Run } from '../api/index';
import { allRuns } from '../modules/courthouse/selectors';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface CourthouseRunListStateProps {
    runs: Run[];
}

interface CourthouseRunListProps extends FormFieldWrapperProps {
    runs?: Run[];
}

class CourthouseRunList extends React.PureComponent<
    CourthouseRunListProps & CourthouseRunListStateProps> {

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
export default connect<CourthouseRunListStateProps, {}, CourthouseRunListProps>(
    mapStateToProps
)(CourthouseRunList);