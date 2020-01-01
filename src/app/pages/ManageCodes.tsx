import React from 'react';
import { Well } from 'react-bootstrap';

import Page from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';
import AdminLeaveTypesPlugin from '../plugins/AdminLeaveTypes';
import AdminTrainingTypesPlugin from '../plugins/AdminTrainingTypes';

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
            <Page>
                <Well
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '85%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <AdminForm
                        key={'admin-code-types-grid'}
                        plugins={[
                            new AdminLeaveTypesPlugin(),
                            new AdminTrainingTypesPlugin()
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default ManageCodeTypes;
