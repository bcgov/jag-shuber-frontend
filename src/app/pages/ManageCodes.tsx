import React from 'react';
import { Well } from 'react-bootstrap';

import Page from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';
import AdminCourtroomsPlugin from '../containers/AdminCodeTypesGrid/AdminCourtroomsGrid';
import AdminLeaveTypesPlugin from '../containers/AdminCodeTypesGrid/AdminLeaveTypesGrid';
import AdminTrainingTypesPlugin from '../containers/AdminCodeTypesGrid/AdminTrainingTypesGrid';

export interface ManageCodeTypesProps {}

class ManageCodeTypes extends React.PureComponent<AdminFormProps> {
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
                        maxWidth: '80%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto'
                    }}
                >
                    <AdminForm
                        key={'admin-code-types-grid'}
                        plugins={[
                            new AdminLeaveTypesPlugin(),
                            new AdminTrainingTypesPlugin(),
                            new AdminCourtroomsPlugin()
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default ManageCodeTypes;
