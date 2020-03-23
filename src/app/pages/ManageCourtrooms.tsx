import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Glyphicon, Well } from 'react-bootstrap';

import Page, { PageToolbar } from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';
import AdminCourtroomsPlugin from '../plugins/AdminAssignmentTypes/AdminCourtrooms';
// import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';

import HeaderSaveButton from '../plugins/AdminRoles/containers/HeaderSaveButton';
import HeaderCancelButton from '../plugins/AdminRoles/containers/HeaderCancelButton';

export interface ManageCourtroomsProps extends RouteComponentProps<any>{};

class ManageCourtrooms extends React.PureComponent<AdminFormProps & Partial<ManageCourtroomsProps>> {
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
        const { history, location } = this.props;
        const { isEditing } = this.state;

        return (
            <Page
                disableLocations={false}
                toolbar={
                    <PageToolbar
                        left={(
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                <div className="admin-form-filters-toggle">
                                    <Glyphicon glyph="chevron-down" />&nbsp;&nbsp;Display Courtroom Search Filters
                                </div>
                            </div>
                        )}
                        right={(
                            <div style={{ marginTop: 3, paddingTop: '10px' }}>
                                <HeaderSaveButton formName={'AdminForm'} />
                                &nbsp;&nbsp;
                                <HeaderCancelButton formName={'AdminForm'} />
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
                        maxWidth: '93%',
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <AdminForm
                        key={'admin-code-types-grid'}
                        plugins={[
                            new AdminCourtroomsPlugin()
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default withRouter(ManageCourtrooms);
