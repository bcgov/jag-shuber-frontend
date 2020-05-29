import React from 'react';
import { connect } from 'react-redux';

import {
    Row,
    Col,
    Button,
    Glyphicon, Alert
} from 'react-bootstrap';

import ModalWrapper from '../../../containers/ModalWrapper/ModalWrapper';
import DataTable, { EmptyDetailRow } from '../../../components/Table/DataTable';

import FrontendScopeSelector from '../containers/FrontendScopeSelector';
import ApiScopeSelector from '../containers/ApiScopeSelector';
import ApiScopeCodeDisplay from '../containers/ApiScopeCodeDisplay';
import ApiScopeDescriptionDisplay from '../containers/ApiScopeDescriptionDisplay';
import AdminRoleScopeAccessModal, { AdminRoleScopeAccessModalProps } from './AdminRoleScopeAccessModal';
import FrontendScopeCodeDisplay from '../containers/FrontendScopeCodeDisplay';
import FrontendScopeDescriptionDisplay from '../containers/FrontendScopeDescriptionDisplay';
import { FrontendScope, Role, RoleApiScope, RoleFrontendScope } from '../../../api';
import { RootState } from '../../../store';
import { getAllRoles } from '../../../modules/roles/selectors';

class RoleApiScopesDataTable extends DataTable<RoleApiScope> {}
class RoleFrontendScopesDataTable extends DataTable<RoleFrontendScope> {}

interface AdminEffectivePermissionsModalStateProps {
    roles?: Role[];
    frontendScopes?: FrontendScope[];
}

export interface AdminEffectivePermissionsModalProps extends AdminEffectivePermissionsModalStateProps{
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
    parentModel?: any;
    parentModelId?: any;
    onClose?: () => void;
}

class AdminEffectivePermissionsModal extends React.Component<AdminEffectivePermissionsModalProps> {
    reduxFormKey = 'roles';
    formFieldNames = {
        roleApiScopesGrouped: 'roles.roleApiScopesGrouped',
        roleFrontendScopesGrouped: 'roles.roleFrontendScopesGrouped'
    };

    private modalWrapper?: any;

    constructor(props: AdminEffectivePermissionsModalProps) {
        super(props);
    }

    handleClose = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();

        const { onClose } = this.props;

        return (this.modalWrapper) ? this.modalWrapper.handleClose(onClose) : undefined;
    }

    // @ts-ignore
    render() {
        const { isOpen, onClose, parentModel } = this.props;
        const parentModelId = parentModel.id ? parentModel.id : null;

        const title = `View Effective Permissions for ${parentModel.roleName}`;

        return (
            <div>
                <ModalWrapper
                    ref={(wrapper) => this.modalWrapper = wrapper}
                    styleClassName="modal-wrapper-large"
                    showButton={() => null}
                    isOpen={isOpen}
                    onClose={onClose}
                    title={title}
                    body={({ handleClose }: any) => (
                        <div className="container-fluid">
                            <Row>
                                <Col>
                                    <Alert bsStyle="info">
                                        <p>
                                            The following tables are for troubleshooting purposes and provide a summary of application component and API permissions granted to the <b>{parentModel.roleName}</b> role.
                                        </p>
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={5}>
                                    <RoleFrontendScopesDataTable
                                        fieldName={`${this.formFieldNames.roleFrontendScopesGrouped}['${parentModelId}']`}
                                        title={''} // Leave this blank
                                        columns={[
                                            DataTable.SelectorFieldColumn('Application Access', { fieldName: 'scopeId', colStyle: { width: '30%' }, selectorComponent: FrontendScopeSelector, displayInfo: true, disabled: true }),
                                            DataTable.MappedTextColumn('Component Code', { fieldName: 'scopeId', colStyle: { width: '50%' }, selectorComponent: FrontendScopeCodeDisplay, displayInfo: false }),
                                            // DataTable.MappedTextColumn('Description', { fieldName: 'scopeId', colStyle: { width: '200px' }, selectorComponent: FrontendScopeDescriptionDisplay, displayInfo: false })
                                            // DataTable.ButtonColumn('Configure Access', 'list', { displayInfo: true }, onButtonClicked)
                                        ]}
                                        rowComponent={EmptyDetailRow}
                                        shouldDisableRow={() => true}
                                        initialValue={{
                                            roleId: parentModelId
                                        }}
                                        modalProps={{ roleId: parentModelId }}
                                        modalComponent={AdminRoleScopeAccessModal}
                                    />
                                </Col>
                                <Col lg={7}>
                                    <RoleApiScopesDataTable
                                        fieldName={`${this.formFieldNames.roleApiScopesGrouped}['${parentModelId}']`}
                                        title={''} // Leave this blank
                                        columns={[
                                            DataTable.SelectorFieldColumn('API Authorization Scope', { fieldName: 'scopeId', colStyle: { width: '30%' }, selectorComponent: ApiScopeSelector, displayInfo: true }),
                                            DataTable.MappedTextColumn('Scope Code', { fieldName: 'scopeId', colStyle: { width: '20%' }, selectorComponent: ApiScopeCodeDisplay, displayInfo: false }),
                                            DataTable.MappedTextColumn('Description', { fieldName: 'scopeId', colStyle: { width: '30%' }, selectorComponent: ApiScopeDescriptionDisplay, displayInfo: false }),
                                            // DataTable.ButtonColumn('Configure Access', 'eye-open', { displayInfo: true }, onButtonClicked),
                                        ]}
                                        rowComponent={EmptyDetailRow}
                                        shouldDisableRow={() => true}
                                        initialValue={{
                                            roleId: parentModelId
                                        }}
                                        modalProps={{ roleId: parentModelId }}
                                        modalComponent={AdminRoleScopeAccessModal}
                                    />
                                </Col>
                            </Row>
                        </div>
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
        roles: getAllRoles(state)
    };
};

export default connect<AdminEffectivePermissionsModalProps>(
    mapStateToProps
)(AdminEffectivePermissionsModal);
