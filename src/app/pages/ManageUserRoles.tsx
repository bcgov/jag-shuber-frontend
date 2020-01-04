import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Glyphicon, Well } from 'react-bootstrap';

// import { IdType } from '../api';
import Page from '../components/Page/Page';
import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

// Import plugins
import AdminAssignUserRolesPlugin from '../plugins/AdminRoles/AdminAssignUserRoles';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';

export interface ManageUserRolesProps extends RouteComponentProps<any>{}

class ManageUserRoles extends React.PureComponent<AdminFormProps & Partial<ManageUserRolesProps>> {
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
                toolbar={
                    <Page.Toolbar
                        left={(
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                <div className="admin-form-filters-toggle">
                                    <Glyphicon glyph="chevron-down" />&nbsp;&nbsp;Display User Search Filters
                                </div>
                            </div>
                        )}
                        right={(
                            <div style={{ marginTop: 3, paddingTop: '10px' }}>
                                &nbsp;
                                {/* <Button
                                    bsStyle="secondary"
                                    onClick={(): void => {
                                        if (history) history.push('/roles/assign');
                                    }}
                                >
                                    <Glyphicon glyph="th-list" /> View as List
                                </Button>
                                &nbsp;&nbsp; */}
                                <Button
                                    bsStyle="secondary"
                                    onClick={(): void => {
                                        if (history) history.push('/users/manage');
                                    }}
                                >
                                    <Glyphicon glyph="th" /> View as Grid
                                </Button>
                                &nbsp;&nbsp;
                                <SheriffProfileCreateModal.ShowButton />
                                {/* <SheriffProfileModal.ShowButton
                                    sheriffId={'90b48bc8-5cc2-48f3-8b28-d7121298a449'}
                                >
                                    Try This
                                </SheriffProfileModal.ShowButton>*/}
                                &nbsp;&nbsp;
                                <Button
                                    bsStyle="success"
                                    // onClick={() => this.handleSave()}
                                >
                                    <Glyphicon glyph="ok" /> Save
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                    bsStyle="danger"
                                    // onClick={() => this.handleSave()}
                                >
                                    <Glyphicon glyph="ban-circle" />
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

export default withRouter(ManageUserRoles);
