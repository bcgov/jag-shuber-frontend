import React from 'react';
import { Button, Glyphicon, Well } from 'react-bootstrap';

import { IdType } from '../api';
import Page from '../components/Page/Page';
// import { DataTableProps } from '../components/Table/DataTable';

// import SheriffList from '../containers/SheriffList';
import AdminRolesGrid, { AdminRolesDisplayProps } from '../containers/AdminRolesGrid/AdminRolesGrid';
// TODO: Probably should get rid of this
// import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';
import AdminForm from '../containers/AdminForm';

class ManageRoles extends React.PureComponent {
    renderDataTable(): any {
        const dataTable = new AdminRolesGrid();
        const roleId: IdType = 'asdf-1234';
        // const data: any = [];
        // TODO: Replace with real data
        const data: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

        const tableProps: AdminRolesDisplayProps = { objectId: roleId, data: data };

        // TODO: Get this working!
        // return dataTable.renderDisplay(tableProps);
        return dataTable.renderFormFields(tableProps);
    }

    render() {
        return (
            <Page
                toolbar={
                    <Page.Toolbar
                        right={(
                            <div style={{ marginTop: 3 }}>
                                {/*<SheriffProfileCreateModal.ShowButton />*/}
                                <Button className="action-button" onClick={() => { return undefined; }}>
                                    <Glyphicon glyph="plus" /> Add a Role
                                </Button>
                            </div>
                        )}
                    />
                }
            >
                <Well
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '80%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto'
                    }}
                >
                    <AdminForm
                        isEditing={true}
                    />
                </Well>
            </Page>
        );
    }
}

export default ManageRoles;
