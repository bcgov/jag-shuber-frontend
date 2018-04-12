import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AlternateAssignment } from '../api/index';
import { allAlternateAssignmentTypes } from '../modules/courthouse/selectors';
import { getAlternateAssignmentTypes } from '../modules/courthouse/action';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface AlternateAssignmentTypeListDispatchProps {
    getAlternateAssignmentTypes?: () => void;
}

interface AlternateAssignmentTypeListStateProps {
    alternateAssignmentTypes: AlternateAssignment[];
}

interface AlternateAssignmentTypeListProps extends FormFieldWrapperProps {
    alternateAssignmentTypes?: AlternateAssignment[];
}

class AlternateAssignmentTypeList extends React.PureComponent<
    AlternateAssignmentTypeListProps & 
    AlternateAssignmentTypeListDispatchProps & 
    AlternateAssignmentTypeListStateProps> {

    componentWillMount() {
        const { getAlternateAssignmentTypes } = this.props;
        getAlternateAssignmentTypes && getAlternateAssignmentTypes();
    }

    render() {
        const { alternateAssignmentTypes = [], ...restProps } = this.props;
        const selectorValues = Object.keys(alternateAssignmentTypes).map(
            (key, index) => ({key, value: alternateAssignmentTypes[key].description}));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        alternateAssignmentTypes: allAlternateAssignmentTypes(state)
    };
};

const mapDispatchToProps = {
    getAlternateAssignmentTypes: getAlternateAssignmentTypes
};

// tslint:disable-next-line:max-line-length
export default connect<AlternateAssignmentTypeListStateProps, AlternateAssignmentTypeListDispatchProps, AlternateAssignmentTypeListProps>(
    mapStateToProps,
    mapDispatchToProps
  )(AlternateAssignmentTypeList);