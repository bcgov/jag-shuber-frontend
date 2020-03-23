/**
 * Note! This page is DEPRECATED in favour of the new ManageAssignmentTypes page.
 * It will be removed as soon as we're done moving things to their new places.
 */
import React from 'react';
import { Col, Well } from 'react-bootstrap';

import Page from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';
import AdminLeaveTypesPlugin from '../plugins/AdminAssignmentTypes/AdminLeaveTypes';
import AdminTrainingTypesPlugin from '../plugins/AdminAssignmentTypes/AdminTrainingTypes';

export interface ManageAssignmentTypesProps {}

class ManageAssignmentTypes extends React.PureComponent<AdminFormProps> {
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
            <Page disableLocations={true}>
                <Well
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '85%',
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <Col sm={12} md={8} mdPush={2}>
                        <AdminForm
                            key={'admin-code-types-grid'}
                            plugins={[
                                new AdminLeaveTypesPlugin(),
                                new AdminTrainingTypesPlugin()
                            ]}
                            isEditing={isEditing}
                        />
                    </Col>
                </Well>
            </Page>
        );
    }
}

export default ManageAssignmentTypes;
