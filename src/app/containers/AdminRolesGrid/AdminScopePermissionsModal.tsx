import React from 'react';
import { Field } from 'redux-form';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';

import SelectorField from '../../components/FormElements/SelectorField';
import FrontendScopeSelector from './FrontendScopeSelector';

export interface AdminScopePermissionsModalProps {
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
    parentModel?: any;
    parentModelId?: any;
}

export default class AdminScopePermissionsModal extends React.Component<AdminScopePermissionsModalProps> {
    private modalWrapper?: any;

    constructor(props: AdminScopePermissionsModalProps) {
        super(props);
    }

    handleClose = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();
        return (this.modalWrapper) ? this.modalWrapper.handleClose() : undefined;
    }

    // @ts-ignore
    render() {
        const { isDefaultTemplate = false, isOpen, parentModel } = this.props;
        const title = `Define ${isDefaultTemplate === true ? 'Default ' : ''}Component Permissions`; // TODO: Auto switch text between 'Component' and 'API'

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
                                columns={[
                                    DataTable.TextFieldColumn('Permission Name', { fieldName: 'displayName', displayInfo: true }),
                                    DataTable.TextFieldColumn('Code', { fieldName: 'displayName', displayInfo: true }),
                                    DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: true })
                                ]}
                                rowComponent={EmptyDetailRow}
                                modalComponent={EmptyDetailRow}
                            />
                        </>
                    )}
                    footerComponent={
                        <>
                            <Button bsStyle={`default`}>
                                <Glyphicon glyph="ban-circle" onClick={this.handleClose} /> Cancel
                            </Button>
                            &nbsp;
                            <Button bsStyle={`success`}>
                                <Glyphicon glyph="ok" onClick={this.handleClose} /> OK
                            </Button>
                        </>
                    }
                />
            </div>
        );
    }
}
