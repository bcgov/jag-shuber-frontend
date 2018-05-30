import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Courthouse } from '../api/index';
import { allCourthouses } from '../modules/courthouse/selectors';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface SheriffLocationSelectorStateProps {
    courthouses: Courthouse[];
}

interface SheriffLocationSelectorProps extends FormFieldWrapperProps {
    courthouses?: Courthouse[];
}

class SheriffLocationSelector extends React.PureComponent<
    SheriffLocationSelectorStateProps & SheriffLocationSelectorProps> {

    render() {
        const { courthouses = [], ...restProps } = this.props;
        const selectorValues = courthouses.map(courthouse => ({ key: courthouse.id, value: courthouse.name }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        courthouses: allCourthouses(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<SheriffLocationSelectorStateProps, {}, SheriffLocationSelectorProps>(
    mapStateToProps
)(SheriffLocationSelector);