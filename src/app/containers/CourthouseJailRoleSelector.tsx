import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { JailRole } from '../api/index';
import { allJailRoles } from '../modules/courthouse/selectors';
import { getJailRoles } from '../modules/courthouse/action';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface CourthouseJailRoleListDispatchProps {
    getJailRoles?: () => void;
}

interface CourthouseJailRoleListStateProps {
    jailRoles: JailRole[];
}

interface CourthouseJailRoleListProps extends FormFieldWrapperProps {
    jailRoles?: JailRole[];
}

class CourthouseJailRoleList extends React.PureComponent<
    CourthouseJailRoleListProps & CourthouseJailRoleListDispatchProps & CourthouseJailRoleListStateProps> {

    componentWillMount() {
        const { getJailRoles } = this.props;
        getJailRoles && getJailRoles();
    }

    render() {
        const { jailRoles = [], ...restProps } = this.props;
        const selectorValues = Object.keys(jailRoles).map((key, index) => ({key, value: jailRoles[key].title}));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        jailRoles: allJailRoles(state)
    };
}

const mapDispatchToProps = {
    getJailRoles: getJailRoles
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseJailRoleListStateProps, CourthouseJailRoleListDispatchProps, CourthouseJailRoleListProps>(
    mapStateToProps,
    mapDispatchToProps
  )(CourthouseJailRoleList);