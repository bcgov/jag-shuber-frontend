import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Glyphicon, Well } from 'react-bootstrap';

// import { IdType } from '../api';
import Page, { PageToolbar } from '../components/Page/Page';
import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

// Import plugins
import AdminUsersPlugin from '../plugins/AdminRoles/AdminUsers';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';

import HeaderSaveButton from '../plugins/AdminRoles/containers/HeaderSaveButton';
import HeaderCancelButton from '../plugins/AdminRoles/containers/HeaderCancelButton';
import PageTitle from '../containers/PageTitle';

export interface ManageUserRolesProps extends RouteComponentProps<any>{};

class ManageUsers extends React.PureComponent<AdminFormProps & Partial<ManageUserRolesProps>> {
    state = {
        isEditing: true,
        displayFilters: true
    };

    constructor(props: AdminFormProps) {
        super(props);

        this.toggleFilters = this.toggleFilters.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleFilters() {
        this.setState({
            displayFilters: !this.state.displayFilters
        });
    }

    toggleEditMode() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    render() {
        const { history, location } = this.props;
        const { isEditing, displayFilters = true } = this.state;

        return (
            <Page
                disableLocations={true}
                toolbar={
                    <PageToolbar
                        left={(
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                <div className="admin-form-filters-toggle" onClick={this.toggleFilters}>
                                    {!displayFilters && (
                                    <><Glyphicon glyph="chevron-right" />&nbsp;&nbsp;Display User Search Filters</>
                                    )}
                                    {displayFilters && (
                                    <><Glyphicon glyph="chevron-down" />&nbsp;&nbsp;Display User Search Filters</>
                                    )}
                                </div>
                            </div>
                        )}
                        right={(
                            <div style={{ marginTop: 3, paddingTop: '10px' }}>
                                <SheriffProfileCreateModal.ShowButton />
                                &nbsp;&nbsp;
                                <HeaderSaveButton formName={'AdminForm'} />
                                &nbsp;&nbsp;
                                <HeaderCancelButton formName={'AdminForm'} />
                            </div>
                        )}
                    />
                }
            >
                <Well
                    className={displayFilters ? `fixed-filters-data-table` : ``}
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '95%',
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <PageTitle title={({ currentLocationName }: any) => `Assign ${currentLocationName} User Roles`} />
                    <AdminForm
                        key={'admin-user-roles-grid'}
                        plugins={[
                            new AdminUsersPlugin(),
                        ]}
                        isEditing={isEditing}
                        displayFilters={displayFilters}
                    />
                </Well>
            </Page>
        );
    }
}

export default withRouter(ManageUsers);
