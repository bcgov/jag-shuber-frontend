import React from 'react';
import { Glyphicon, Well } from 'react-bootstrap';

import { connect, Dispatch } from 'react-redux';

import Page, { PageToolbar } from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import * as AdminFormTemplates from '../components/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

import PageTitle from '../containers/PageTitle';

import WorkSectionsLayout from '../plugins/AdminAssignmentTypes/WorkSectionsLayout';

import AdminCourtroomsPlugin from '../plugins/AdminAssignmentTypes/AdminCourtrooms';
import AdminCourtRolesPlugin from '../plugins/AdminAssignmentTypes/AdminCourtRoles';
import AdminJailRolesPlugin from '../plugins/AdminAssignmentTypes/AdminJailRoles';
import AdminEscortTypesPlugin from '../plugins/AdminAssignmentTypes/AdminEscortTypes';
import AdminOtherTypesPlugin from '../plugins/AdminAssignmentTypes/AdminOtherTypes';

import {
    selectAdminCourtroomsPluginSection,
    selectAdminCourtRolesPluginSection,
    selectAdminJailRolesPluginSection,
    selectAdminEscortTypesPluginSection,
    selectAdminOtherTypesPluginSection,
} from '../modules/assignments/actions';

import {
    selectedAdminAssignmentTypesSection
} from '../modules/assignments/selectors';

import { RootState } from '../store';

export interface ManageAssignmentTypesStateProps {
    selectedSection?: {}; // TODO: Think it's a string, always though?
}

export interface ManageAssignmentTypesDispatchProps {
    selectAdminCourtroomsPluginSection: (sectionName: string) => {};
    selectAdminCourtRolesPluginSection: (sectionName: string) => {};
    selectAdminJailRolesPluginSection: (sectionName: string) => {};
    selectAdminEscortTypesPluginSection: (sectionName: string) => {};
    selectAdminOtherTypesPluginSection: (sectionName: string) => {};
}

export interface ManageAssignmentTypesProps extends
    ManageAssignmentTypesStateProps, ManageAssignmentTypesDispatchProps {}

class ManageCodeTypes extends React.PureComponent<AdminFormProps & ManageAssignmentTypesProps> {
    static defaultProps: Partial<ManageAssignmentTypesProps> = {
        selectedSection: 'ADMIN_COURTROOMS'
    };

    state = {
      isEditing: true
    };

    constructor(props: AdminFormProps & ManageAssignmentTypesProps) {
        super(props);

        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // TODO: This might take some work to get right...
        // If the selectedSection has changed, update
        const { selectedSection } = this.props;
        // console.log(`should page update? ${selectedSection !== nextProps.selectedSection}`);
        if (selectedSection !== nextProps.selectedSection) {
            return true;
        }

        return false;
    }

    toggleEditMode() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    render() {
        const { isEditing } = this.state;

        const {
            // tslint:disable-next-line:no-shadowed-variable
            selectAdminCourtroomsPluginSection,
            // tslint:disable-next-line:no-shadowed-variable
            selectAdminCourtRolesPluginSection,
            // tslint:disable-next-line:no-shadowed-variable
            selectAdminJailRolesPluginSection,
            // tslint:disable-next-line:no-shadowed-variable
            selectAdminEscortTypesPluginSection,
            // tslint:disable-next-line:no-shadowed-variable
            selectAdminOtherTypesPluginSection,
            selectedSection
        } = this.props;

        return (
            <Page
                key={selectedSection}
                disableLocations={false}
                toolbar={
                    <PageToolbar
                        left={(
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }} />
                        )}
                        middle={(
                            <>
                                <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                                        <h6 style={{ color: 'white', fontWeight: 'bold', marginBottom: '3px' }}>Choose Work Section: </h6>
                                    </div>
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_PLUGIN_COURTROOMS:ADMIN_PLUGIN_COURT_ROLES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_PLUGIN_COURTROOMS:ADMIN_PLUGIN_COURT_ROLES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Court<span className="visible-lg">&nbsp;Assignments</span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_PLUGIN_JAIL_ROLES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_PLUGIN_JAIL_ROLES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Jail<span className="visible-lg">&nbsp;Assignments</span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_PLUGIN_ESCORT_TYPES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_PLUGIN_ESCORT_TYPES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Escort<span className="visible-lg">&nbsp;Runs</span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_PLUGIN_OTHER_TYPES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_PLUGIN_OTHER_TYPES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Other<span className="visible-lg">&nbsp;Assignments</span>
                                    </div>
                                </div>
                            </>
                        )}
                        right={(
                            <div style={{ marginTop: 3, paddingTop: '10px' }}>
                                {/* <HeaderSaveButton formName={'AdminForm'} />
                                &nbsp;&nbsp;
                                <HeaderCancelButton formName={'AdminForm'} /> */}
                            </div>
                        )}
                    >
                        {/* Center */}
                        <div>
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                <div className={`hidden-xs`} style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                                    <h6 style={{ color: 'white', fontWeight: 'bold', marginBottom: '3px' }}>Choose Work Section</h6>
                                </div>
                                <div
                                    className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_COURTROOMS' ? ' is-active' : ''}`}
                                    onClick={() => selectAdminCourtroomsPluginSection('ADMIN_COURTROOMS')}>
                                    {/* <Glyphicon glyph="chevron-down" /> */}
                                    Courtrooms<span className="visible-lg"></span>
                                </div>
                                &nbsp;&nbsp;
                                <div
                                    className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_COURT_ROLES' ? ' is-active' : ''}`}
                                    onClick={() => selectAdminCourtRolesPluginSection('ADMIN_COURT_ROLES')}>
                                    {/* <Glyphicon glyph="chevron-down" /> */}
                                    Court<span className="hidden-lg">s</span><span className="visible-lg">&nbsp;Roles</span>
                                </div>
                                &nbsp;&nbsp;
                                <div
                                    className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_JAIL_ROLES' ? ' is-active' : ''}`}
                                    onClick={() => selectAdminJailRolesPluginSection('ADMIN_JAIL_ROLES')}>
                                    {/* <Glyphicon glyph="chevron-down" /> */}
                                    Jail<span className="hidden-lg">s</span><span className="visible-lg">&nbsp;Roles</span>
                                </div>
                                &nbsp;&nbsp;
                                <div
                                    className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_ESCORT_TYPES' ? ' is-active' : ''}`}
                                    onClick={() => selectAdminEscortTypesPluginSection('ADMIN_ESCORT_TYPES')}>
                                    {/* <Glyphicon glyph="chevron-down" /> */}
                                    Escort<span className="hidden-lg">s</span><span className="visible-lg">&nbsp;Runs</span>
                                </div>
                                &nbsp;&nbsp;
                                <div
                                    className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_OTHER_TYPES' ? ' is-active' : ''}`}
                                    onClick={() => selectAdminOtherTypesPluginSection('ADMIN_OTHER_TYPES')}>
                                    {/* <Glyphicon glyph="chevron-down" /> */}
                                    Other<span className="visible-lg">&nbsp;Assignments</span>
                                </div>
                            </div>
                        </div>
                    </PageToolbar>
                }
            >
                <Well
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
                    {/* TODO: Either fix or delete this title */}
                    {/* <PageTitle title={({ currentLocationName }: {}) => `Manage ${currentLocationName} Assignment Types`} /> */}
                    <AdminForm
                        templateComponent={WorkSectionsLayout}
                        showTabs={false}
                        plugins={[
                            new AdminCourtroomsPlugin(),
                            new AdminCourtRolesPlugin(),
                            new AdminJailRolesPlugin(),
                            new AdminEscortTypesPlugin(),
                            new AdminOtherTypesPlugin()
                        ]}
                        isEditing={isEditing}
                        selectedSection={selectedSection}
                    />
                </Well>
            </Page>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        selectedSection: selectedAdminAssignmentTypesSection(state)
    };
};

const mapDispatchToProps = {
    selectAdminCourtroomsPluginSection,
    selectAdminCourtRolesPluginSection,
    selectAdminJailRolesPluginSection,
    selectAdminEscortTypesPluginSection,
    selectAdminOtherTypesPluginSection,
};

// tslint:disable-next-line:max-line-length
export default connect<ManageAssignmentTypesStateProps, ManageAssignmentTypesDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(ManageCodeTypes);
