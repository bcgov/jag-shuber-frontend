/**
 * Note! This page is DEPRECATED in favour of the new ManageAssignmentTypes page.
 * It will be removed as soon as we're done moving things to their new places.
 */
import React from 'react';
import { Col, Well } from 'react-bootstrap';

import { connect, Dispatch } from 'react-redux';

import Page, { PageToolbar } from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import * as AdminFormTemplates from '../components/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

import PageTitle from '../containers/PageTitle';

import LeaveTypesLayout from '../plugins/AdminLeaveTypes/LeaveTypesLayout';

import AdminLeaveTypesPlugin from '../plugins/AdminLeaveTypes/AdminLeaveTypes';
import AdminTrainingTypesPlugin from '../plugins/AdminLeaveTypes/AdminTrainingTypes';

import { selectedAdminRolesSection as selectedAdminFormSection } from '../modules/roles/selectors';
import { selectAdminRolesPluginSection } from '../modules/roles/actions';

import { RootState } from '../store';

export interface ManageLeaveTypesStateProps {
    selectedSection?: any; // TODO: Think it's a string, always though?
}

export interface ManageLeaveTypesDispatchProps {
    selectAdminFormSection: (sectionName: string) => any;
}

export interface ManageLeaveTypesProps extends
    ManageLeaveTypesStateProps, ManageLeaveTypesDispatchProps {}

class ManageLeaveTypes extends React.PureComponent<AdminFormProps & ManageLeaveTypesProps> {
    static defaultProps: Partial<ManageLeaveTypesProps> = {
        selectedSection: 'ADMIN_PLUGIN_LEAVE_TYPES:ADMIN_PLUGIN_TRAINING_TYPES'
    };

    state = {
      isEditing: true
    };

    constructor(props: AdminFormProps & ManageLeaveTypesProps) {
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

        const {
            selectAdminFormSection,
            selectedSection = 'ADMIN_PLUGIN_LEAVE_TYPES:ADMIN_PLUGIN_TRAINING_TYPES'
        } = this.props;

        return (
            <Page
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
                                        <h6 style={{ color: 'white', fontWeight: 'bold', marginBottom: '3px' }}>Choose Type: </h6>
                                    </div>
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_PLUGIN_LEAVE_TYPES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_PLUGIN_LEAVE_TYPES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Leave<span className="visible-lg">&nbsp; Types</span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className={`admin-form-filters-toggle admin-form-page-tab${selectedSection === 'ADMIN_PLUGIN_TRAINING_TYPES' ? ' is-active' : ''}`} onClick={() => selectAdminFormSection('ADMIN_PLUGIN_TRAINING_TYPES')}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Training<span className="visible-lg">&nbsp; Types</span>
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
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    {/* <PageTitle title={({}: any) => `Manage Leave & Training Types`} /> */}
                    <AdminForm
                        key={'admin-code-types-grid'}
                        templateComponent={LeaveTypesLayout}
                        showTabs={false}
                        plugins={[
                            new AdminLeaveTypesPlugin(),
                            new AdminTrainingTypesPlugin()
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
        selectedSection: selectedAdminFormSection(state)
    };
};

const mapDispatchToProps = {
  selectAdminFormSection: selectAdminRolesPluginSection
};

// tslint:disable-next-line:max-line-length
export default connect<ManageLeaveTypesStateProps, ManageLeaveTypesDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ManageLeaveTypes);
