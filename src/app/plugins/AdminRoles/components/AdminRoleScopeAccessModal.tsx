import React from 'react';
import { Field } from 'redux-form';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';

import ModalWrapper from '../../../containers/ModalWrapper/ModalWrapper';
import DataTable, { EmptyDetailRow } from '../../../components/Table/DataTable';

import SelectorField from '../../../components/FormElements/SelectorField';
import FrontendScopeSelector from '../containers/FrontendScopeSelector';
import RemoveRow from '../../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../../components/TableColumnActions/ExpireRow';

export interface AdminRoleScopeAccessModalProps {
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
    roleId?: any;
    parentModel?: any;
    parentModelId?: any;
    onClose?: () => void;
}

export default class AdminRoleScopeAccessModal extends React.Component<AdminRoleScopeAccessModalProps>{
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

    // @ts-ignore
    render() {
        const { isDefaultTemplate = false, isOpen, roleId, parentModel, parentModelId } = this.props;
        const title = `Edit ${isDefaultTemplate === true ? 'Default ' : ''}Application Access`;

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
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* TODO: Finish implementing this selector if we have time */}
                                    {/* <Field
                                        name={`component`}
                                        component={(p) =>
                                            <SelectorField
                                                {...p}
                                                style={{ minWidth: '100%' }}
                                                showLabel={true}
                                                // TODO: Provide this via props or something so we can use custom codes...
                                                SelectorComponent={
                                                    (sp) =>
                                                        <FrontendScopeSelector {...sp} value={parentModel.id} />
                                                    }
                                            />
                                        }
                                        label={'Component / API Scope'}
                                    /> */}
                                    {/* This wrapper just adds equal spacing to the previous form group */}
                                    {/* TODO: Where are the spacing utils? */}
                                    {/* <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                                        <Glyphicon glyph="info-sign" />
                                    </div> */}
                                </div>
                            </div>
                            {parentModelId && (
                            <DataTable
                                fieldName={`roles.roleFrontendScopePermissionsGrouped['${roleId}']['${parentModel.id}']`}
                                title={''} // Leave this blank
                                expandable={false}
                                displayHeaderActions={false}
                                displayActionsColumn={false}
                                // No actions necessary
                                columns={[
                                    DataTable.StaticTextColumn('Permission', { fieldName: 'displayName', colStyle: { width: '200px' }, displayInfo: false }),
                                    // DataTable.StaticTextColumn('Code', { fieldName: 'displayName', displayInfo: false }),
                                    DataTable.StaticTextColumn('Description', { fieldName: 'description', displayInfo: false }),
                                    DataTable.CheckboxColumn('Grant Permission', { fieldName: 'hasPermission', displayInfo: false }), // TODO: Use a checkbox
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
