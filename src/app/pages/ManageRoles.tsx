import React from 'react';
import { Well } from 'react-bootstrap';

// import { IdType } from '../api';
import Page from '../components/Page/Page';
import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

// Import plugins
import AdminRolesGridPlugin from '../containers/AdminRolesGrid/AdminRolesGrid';
import AdminFrontendScopesGridPlugin from '../containers/AdminRolesGrid/AdminFrontendScopesGrid';
import AdminApiScopesGridPlugin from '../containers/AdminRolesGrid/AdminApiScopesGrid';
// import AdminCodeTypesGridPlugin from '../containers/AdminCodeTypesGrid/AdminCodeTypesGrid';

export interface ManageRolesProps {}

class ManageRoles extends React.PureComponent<AdminFormProps> {
    state = {
      isEditing: true
    };

    constructor(props: AdminFormProps) {
        super(props);

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

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
                        key={'admin-roles-grid'}
                        plugins={[
                            new AdminRolesGridPlugin(),
                            new AdminFrontendScopesGridPlugin(),
                            new AdminApiScopesGridPlugin()
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default ManageRoles;
