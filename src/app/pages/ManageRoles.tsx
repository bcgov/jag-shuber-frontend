import React from 'react';
import { Button, Glyphicon, Well } from 'react-bootstrap';

import { IdType } from '../api';
import Page from '../components/Page/Page';
// import { FormContainerProps } from '../components/Form/FormContainer';

// import SheriffList from '../containers/SheriffList';
import AdminRolesGrid, { AdminRolesDisplayProps } from '../containers/AdminRolesGrid/AdminRolesGrid';
// TODO: Probably should get rid of this
// import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';
import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';
import { FormContainerBase } from '../components/Form/FormContainer';

// Import plugins
import AdminRolesGridPlugin from '../containers/AdminRolesGrid/AdminRolesGrid';
import AdminCodeTypesGridPlugin from '../containers/AdminCodeTypesGrid/AdminCodeTypesGrid';

export interface ManageRolesProps {}

class ManageRoles extends React.PureComponent<AdminFormProps> {
    state = {
      isEditing: true
    };

    constructor(props: AdminFormProps) {
        super(props);

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    /*renderFormContainer(): {} {
        const dataTable = new AdminRolesGrid();
        const roleId: IdType = 'asdf-1234';
        // const data: any = [];
        // TODO: Replace with real data
        const data: {}[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

        const tableProps: AdminRolesDisplayProps = { objectId: roleId, data: data };

        // TODO: Get this working!
        // return dataTable.renderDisplay(tableProps);
        return dataTable.renderFormFields(tableProps);
    }*/

    // TODO: What is the name of the function elsewhere?
    toggleEditMode() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    render() {
        const { isEditing } = this.state;

        return (
            <Page
                toolbar={
                    <Page.Toolbar
                        right={(
                            <div style={{ marginTop: 3 }}>
                                {/*<SheriffProfileCreateModal.ShowButton />*/}
                                {/*<Button className="action-button" onClick={this.toggleEditMode}>
                                    <Glyphicon glyph="edit" /> Edit Roles
                                </Button>*/}
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
                        key={Math.random()}
                        plugins={[
                            new AdminRolesGridPlugin(),
                            new AdminCodeTypesGridPlugin()
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default ManageRoles;
