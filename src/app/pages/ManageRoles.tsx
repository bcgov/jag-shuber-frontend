import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Glyphicon, Well } from 'react-bootstrap';

// import { IdType } from '../api';
import Page, { PageToolbar } from '../components/Page/Page';
import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

// Import plugins
import AdminRolesGridPlugin from '../plugins/AdminRoles/AdminRoles';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';
import HeaderSaveButton from '../plugins/AdminRoles/containers/HeaderSaveButton';
import HeaderCancelButton from '../plugins/AdminRoles/containers/HeaderCancelButton';
import PageTitle from '../containers/PageTitle';

export interface ManageRolesProps extends RouteComponentProps<any>{}

class ManageRoles extends React.PureComponent<AdminFormProps & Partial<ManageRolesProps>> {
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
                disableLocations={true}
                toolbar={
                    <PageToolbar
                        // TODO: Figure out a better way to space this... just a temporary placeholder / spacer for now
                        left={(
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                <div className="admin-form-filters-toggle">
                                    <Glyphicon glyph="chevron-down" />&nbsp;&nbsp;Display Role Search Filters
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
                    className="fixed-filters-data-table"
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '95%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <PageTitle title={() => `Manage System Roles and Access`} />
                    <AdminForm
                        key={'admin-roles-grid'}
                        plugins={[
                            new AdminRolesGridPlugin()
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default withRouter(ManageRoles);
