import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Run } from '../api/index';
import { allRuns } from '../modules/courthouse/selectors';
import { getRuns } from '../modules/courthouse/action';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface CourthouseRunListDispatchProps {
    getRuns?: () => void;
}

interface CourthouseRunListStateProps {
    runs: Run[];
}

interface CourthouseRunListProps extends FormFieldWrapperProps {
    runs?: Run[];
}

class CourthouseRunList extends React.PureComponent<
    CourthouseRunListProps & CourthouseRunListDispatchProps & CourthouseRunListStateProps> {

    componentWillMount() {
        const { getRuns } = this.props;
        getRuns && getRuns();
    }

    render() {
        const { runs = [], ...restProps } = this.props;
        const selectorValues = Object.keys(runs).map((key, index) => ({key, value: runs[key].description}));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        runs: allRuns(state)
    };
}

const mapDispatchToProps = {
    getRuns: getRuns
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseRunListStateProps, CourthouseRunListDispatchProps, CourthouseRunListProps>(
    mapStateToProps,
    mapDispatchToProps
  )(CourthouseRunList);