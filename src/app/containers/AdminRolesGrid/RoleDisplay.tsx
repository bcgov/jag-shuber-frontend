import React from 'react';
import { connect } from 'react-redux';

import Selector, { SelectorProps } from '../../components/FormElements/Selector';

import { Role } from '../../api';

import { RootState } from '../../store';
import { getAllRoles } from '../../modules/roles/selectors';

interface RoleDisplayStateProps {
    roles?: Role[];
}

class RoleDisplay extends React.PureComponent<
    RoleDisplayStateProps & SelectorProps> {

    render() {
        const {
            roles = [],
            ...restProps
        } = this.props;
        const selectorValues = roles.map(role => ({ key: role.id as string, value: role.roleName as string }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        roles: getAllRoles(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<RoleDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(RoleDisplay);
