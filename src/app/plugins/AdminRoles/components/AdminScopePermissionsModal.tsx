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

export interface AdminScopePermissionsModalProps {
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
    parentModel?: any;
    parentModelId?: any;
    onClose?: () => void;
}

export default class AdminScopePermissionsModal extends React.Component<AdminScopePermissionsModalProps> {
    private modalWrapper?: any;

    constructor(props: AdminScopePermissionsModalProps) {
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
        const { isDefaultTemplate = false, isOpen, onClose, parentModel } = this.props;
        const title = `Define ${isDefaultTemplate ? 'Default ' : ''}Component Permissions`; // TODO: Auto switch text between 'Component' and 'API'

        return (
            <div>
                <ModalWrapper
                    ref={(wrapper) => this.modalWrapper = wrapper}
                    styleClassName="modal-wrapper-medium"
                    showButton={() => null}
                    isOpen={isOpen}
                    onClose={onClose}
                    title={title}
                    body={({ handleClose }: any) => (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Field
                                        name={`component`}
                                        component={(p) => <SelectorField
                                            {...p}
                                            showLabel={true}
                                            // TODO: Provide this via props or something so we can use custom codes...
                                            SelectorComponent={
                                                (sp) =>
                                                    // TODO: Actually make this work
                                                    <FrontendScopeSelector {...sp} value={parentModel.id} />
                                                }
                                        />}
                                        label={'Choose Component'}
                                    >
                                    </Field>
                                    {/* This wrapper just adds equal spacing to the previous form group */}
                                    {/* TODO: Where are the spacing utils? */}
                                    <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                                        <Glyphicon glyph="info-sign" />
                                    </div>
                                </div>
                                {/*<div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button>
                                        <Glyphicon glyph="plus" /> Add Permission
                                    </Button>`
                                </div>*/}
                            </div>
                            <DataTable
                                fieldName={`roles.frontendScopePermissionsGrouped['${parentModel.id}']`}
                                title={''} // Leave this blank
                                displayHeaderActions={true}
                                displayHeaderSave={false}
                                displayActionsColumn={true}
                                actionsColumn={DataTable.ActionsColumn({
                                    actions: [
                                        ({ fields, index, model }) => <RemoveRow fields={fields} index={index} model={model} />,
                                        ({ fields, index, model }) => { return (model && model.id) ? (<ExpireRow fields={fields} index={index} model={model} />) : null; }
                                    ]
                                })}
                                columns={[
                                    DataTable.TextFieldColumn('Permission Name', { fieldName: 'displayName', displayInfo: true }),
                                    DataTable.TextFieldColumn('Code', { fieldName: 'permissionCode', displayInfo: true }),
                                    DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: true })
                                ]}
                                rowComponent={EmptyDetailRow}
                                modalComponent={EmptyDetailRow}
                            />
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
