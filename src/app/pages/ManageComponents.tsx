import React from 'react';
import { Well } from 'react-bootstrap';

// import { IdType } from '../api';
import Page from '../components/Page/Page';
import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

// Import plugins
import AdminFrontendScopesGridPlugin from '../containers/AdminRolesGrid/AdminFrontendScopesGrid';

export interface ManageComponentsProps {}

class ManageComponents extends React.PureComponent<AdminFormProps> {
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
            <Page
                toolbar={
                    <Page.Toolbar
                        right={(
                            <div style={{ marginTop: 3 }}>
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
                        maxWidth: '100%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto'
                    }}
                >
                    <AdminForm
                        key={'admin-components-grid'}
                        plugins={[
                            new AdminFrontendScopesGridPlugin()
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default ManageComponents;
