import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Glyphicon, Table, Well } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import Page, { PageToolbar } from '../components/Page/Page';
import AdminForm from '../containers/AdminForm';
import PageTitle from '../containers/PageTitle';

import { AdminFormProps } from '../components/AdminForm/AdminForm';

// Import plugins
import AdminUsersPlugin from '../plugins/AdminUsers/AdminUsers';

import SheriffListComposable from '../containers/SheriffListComposable';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';
import HeaderSaveButton from '../plugins/AdminRoles/containers/HeaderSaveButton';
import HeaderCancelButton from '../plugins/AdminRoles/containers/HeaderCancelButton';

export interface ManageUsersProps extends RouteComponentProps<any>{}

const DISPLAY_CARDS = 'CARDS';
const DISPLAY_LIST = 'LIST';

class ManageUsers extends React.PureComponent<AdminFormProps & Partial<ManageUsersProps>> {
    state = {
        isEditing: true,
        displayMode: DISPLAY_LIST,
        displayFilters: true
    };

    constructor(props: AdminFormProps) {
        super(props);

        this.toggleDisplayMode = this.toggleDisplayMode.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleDisplayMode() {
        const { displayMode } = this.state;
        let mode = displayMode === DISPLAY_LIST ? DISPLAY_CARDS : displayMode === DISPLAY_CARDS ? DISPLAY_LIST : null;
        this.setState({
            displayMode: mode
        });
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
        const { isEditing, displayMode, displayFilters = true } = this.state;

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
                                &nbsp;
                                {/* <Button
                                    bsStyle="secondary"
                                    onClick={this.toggleDisplayMode}
                                >
                                    <Glyphicon glyph="th-list" /> View as {displayMode === DISPLAY_LIST ? 'List' : displayMode === DISPLAY_CARDS ? 'Grid' : ''}
                                </Button> */}
                                &nbsp;&nbsp;
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
                        maxWidth: '100%',
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <PageTitle title={({ currentLocationName }: any) => `Manage ${currentLocationName} Users`} />
                    {displayMode === DISPLAY_LIST && (
                    <AdminForm
                        key={'admin-users-grid'}
                        plugins={[
                            new AdminUsersPlugin(),
                        ]}
                        isEditing={isEditing}
                        displayFilters={displayFilters}
                    />
                    )}
                    {displayMode === DISPLAY_CARDS && (
                    <SheriffListComposable />
                    )}
                </Well>
            </Page>
        );
    }
}

export default reduxForm({ form: 'UsersGrid' })(withRouter(ManageUsers) as any);
