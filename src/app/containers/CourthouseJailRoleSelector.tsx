import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { JailRole } from '../api';
import { allJailRoles } from '../modules/courthouse/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface CourthouseJailRoleListStateProps {
    jailRoles: JailRole[];
}

class CourthouseJailRoleList extends React.PureComponent<
    SelectorProps & CourthouseJailRoleListStateProps> {

    render() {
        const { jailRoles = [], ...restProps } = this.props;
        const selectorValues = jailRoles.map(role => ({ key: role.code, value: role.description }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        jailRoles: allJailRoles(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseJailRoleListStateProps, {}, SelectorProps>(
    mapStateToProps
)(CourthouseJailRoleList);