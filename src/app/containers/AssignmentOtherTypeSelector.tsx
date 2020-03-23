import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AlternateAssignment } from '../api';
import {
    allEffectiveAlternateAssignmentTypes,
    allAlternateAssignmentTypes
} from '../modules/assignments/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface AlternateAssignmentTypeListStateProps {
    alternateAssignmentTypes: AlternateAssignment[];
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

class AlternateAssignmentTypeList extends React.PureComponent<
    SelectorProps &
    AlternateAssignmentTypeListStateProps> {

    render() {
        const { alternateAssignmentTypes = [], ...rest } = this.props;

        alternateAssignmentTypes.sort(sortByOrder);

        const selectorValues = alternateAssignmentTypes.map(type => ({ key: type.id as string, value: type.description as string }));
        return (
            <Selector
                data={selectorValues}
                {...rest}
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        alternateAssignmentTypes: allEffectiveAlternateAssignmentTypes()(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<AlternateAssignmentTypeListStateProps, {}, SelectorProps>(
    mapStateToProps
)(AlternateAssignmentTypeList);
