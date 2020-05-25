// TODO: This is a connected component, really doesn't belong in here anymore...
//  These TableColumnActions should eventually be moved to a lib or the plugins folder...
import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Glyphicon } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

import { IdType, FrontendScopePermission } from '../../../api';

import { RootState } from '../../../store';

import { getFrontendScopePermissionsByScopeId } from '../../../modules/roles/selectors';

export interface ConfigureRoleFrontendScopeButtonStateProps {
    frontendScopePermissions?: FrontendScopePermission[];
}

export interface ConfigureRoleFrontendScopeButtonProps
    extends TableColumnActionProps, ConfigureRoleFrontendScopeButtonStateProps {
    onButtonClicked: (ev: any) => void;
    frontendScopeId: IdType;
}

class ConfigureRoleFrontendScopeButton
    extends React.Component<ConfigureRoleFrontendScopeButtonProps>{
    constructor(props: ConfigureRoleFrontendScopeButtonProps) {
        super(props);
    }

    render() {
        const {
            showComponent = false,
            onButtonClicked,
            frontendScopePermissions
        } = this.props;

        return (!showComponent || !frontendScopePermissions || frontendScopePermissions.length === 0)
            ? null // Don't display the button unless there are permissions defined for the scope
            : (
                <Button
                    bsStyle="primary"
                    onClick={onButtonClicked}>
                    <Glyphicon glyph="wrench" />
                </Button>
            );
    }
}

const mapStateToProps = (state: RootState, props: ConfigureRoleFrontendScopeButtonProps) => {
    const { frontendScopeId } = props;
    return {
        frontendScopePermissions: getFrontendScopePermissionsByScopeId(frontendScopeId)(state)
    };
};

export default connect<ConfigureRoleFrontendScopeButtonStateProps, ConfigureRoleFrontendScopeButtonProps>(
    mapStateToProps
)(ConfigureRoleFrontendScopeButton);
