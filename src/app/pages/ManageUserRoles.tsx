import React from 'react';
import { Well } from 'react-bootstrap';

// import { IdType } from '../api';
import Page from '../components/Page/Page';
import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

// Import plugins
import AdminAssignUserRolesPlugin from '../plugins/AdminRoles/AdminAssignUserRoles';

export interface ManageUserRolesProps {}

class ManageUserRoles extends React.PureComponent<AdminFormProps> {
    state = {
      isEditing: true
    };

    constructor(props: AdminFormProps) {
        super(props);

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    render() {
        const { isEditing } = this.state;

        return (
            <Page>
                <Well
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '100%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <AdminForm
                        key={'admin-roles-grid'}
                        plugins={[
                            new AdminAssignUserRolesPlugin(),
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default ManageUserRoles;
