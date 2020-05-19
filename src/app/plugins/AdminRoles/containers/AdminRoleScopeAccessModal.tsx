import React from 'react';
import { connect } from 'react-redux';

import {
    Alert,
    Button,
    Glyphicon
} from 'react-bootstrap';

import { FrontendScope, Role } from '../../../api';

import { RootState } from '../../../store';
import { getAllFrontendScopes, getAllRoles } from '../../../modules/roles/selectors';

import ModalWrapper from '../../../containers/ModalWrapper/ModalWrapper';
import DataTable, { EmptyDetailRow } from '../../../components/Table/DataTable';

interface AdminRoleScopeAccessModalStateProps {
    roles?: Role[];
    frontendScopes?: FrontendScope[];
}

export interface AdminRoleScopeAccessModalProps extends AdminRoleScopeAccessModalStateProps {
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
    roleId?: any;
    parentModel?: any;
    parentModelId?: any;
    onClose?: () => void;
}

class AdminRoleScopeAccessModal extends React.Component<AdminRoleScopeAccessModalProps>{
    private modalWrapper?: any;

    constructor(props: AdminRoleScopeAccessModalProps) {
        super(props);
    }

    handleClose = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();

        const { onClose } = this.props;

        return (this.modalWrapper) ? this.modalWrapper.handleClose(onClose) : undefined;
    }

    getScope(): FrontendScope {
        const { frontendScopes = [], parentModel } = this.props;
        return frontendScopes.find((item) => item.id === parentModel.scopeId) || {} as FrontendScope;
    }

    getRole(): Role {
        const { roles = [], parentModel } = this.props;
        return roles.find((item) => item.id === parentModel.roleId) || {} as Role;
    }

    // @ts-ignore
    render() {
        const { isDefaultTemplate = false, isOpen, roleId, parentModel, parentModelId } = this.props;

        const { scopeName = '' }: FrontendScope = this.getScope();
        const { roleName = '' }: Role = this.getRole();

        const title = `Edit ${isDefaultTemplate ? 'Default' : roleName} Access [${scopeName} Plugin]`;

        return (
            <div>
                <ModalWrapper
                    ref={(wrapper) => this.modalWrapper = wrapper}
                    styleClassName="modal-wrapper-medium"
                    showButton={() => null}
                    isOpen={isOpen}
                    title={title}
                    body={({ handleClose }: any) => (
                        <>
                            <Alert bsStyle="info">
                                <p>
                                    Select / remove any <b>{scopeName} Plugin</b> permissions assigned to the <b>{roleName}</b> role.
                                    Default access is read-only.
                                </p>
                                <p>
                                    To deny read access for the <b>{roleName}</b> role, close this window and remove the [{scopeName}] plugin from the role.
                                </p>
                            </Alert>
                            {parentModelId && (
                            <DataTable
                                fieldName={`roles.roleFrontendScopePermissionsGrouped['${roleId}']['${parentModel.id}']`}
                                title={parentModel.name} // Leave this blank
                                expandable={false}
                                displayHeaderActions={false}
                                displayActionsColumn={false}
                                // No actions necessary
                                columns={[
                                    DataTable.CheckboxColumn('Grant Permission', { fieldName: 'hasPermission', displayInfo: false }), // TODO: Use a checkbox
                                    // DataTable.StaticTextColumn('Code', { fieldName: 'displayName', displayInfo: false }),
                                    DataTable.StaticTextColumn('Permission Type', { fieldName: 'displayName', colStyle: { width: '200px' }, displayInfo: false }),
                                    DataTable.StaticTextColumn('Description', { fieldName: 'description', displayInfo: false }),
                                ]}
                                rowComponent={EmptyDetailRow}
                                modalComponent={EmptyDetailRow}
                            />
                            )}
                        </>
                    )}
                    footerComponent={
                        <>
                            <Button bsStyle={`default`} onClick={this.handleClose}>
                                <Glyphicon glyph="ban-circle" /> Cancel
                            </Button>
                            &nbsp;
                            <Button bsStyle={`success`} onClick={this.handleClose}>
                                <Glyphicon glyph="ok" /> OK
                            </Button>
                        </>
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        roles: getAllRoles(state),
        frontendScopes: getAllFrontendScopes(state)
    };
};

export default connect<AdminRoleScopeAccessModalProps>(
    mapStateToProps
)(AdminRoleScopeAccessModal);
