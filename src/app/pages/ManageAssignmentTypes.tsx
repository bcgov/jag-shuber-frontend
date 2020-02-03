import React from 'react';
import { Glyphicon, Well } from 'react-bootstrap';

import Page, { PageToolbar } from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import * as AdminFormTemplates from '../components/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';

import WorkSectionsLayout from '../plugins/AdminAssignmentTypes/WorkSectionsLayout';

import AdminCourtroomsPlugin from '../plugins/AdminAssignmentTypes/AdminCourtrooms';
import AdminCourtRolesPlugin from '../plugins/AdminAssignmentTypes/AdminCourtRoles';
import AdminJailRolesPlugin from '../plugins/AdminAssignmentTypes/AdminJailRoles';
import AdminEscortTypesPlugin from '../plugins/AdminAssignmentTypes/AdminEscortTypes';
import AdminOtherTypesPlugin from '../plugins/AdminAssignmentTypes/AdminOtherTypes';
import HeaderSaveButton from '../plugins/AdminRoles/containers/HeaderSaveButton';
import HeaderCancelButton from '../plugins/AdminRoles/containers/HeaderCancelButton';

export interface ManageAssignmentTypesProps {}

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
                                    <div className="admin-form-filters-toggle" style={{ backgroundColor: 'white', color: 'black' }}>
                                        {/* <Glyphicon glyph="chevron-down" /> */}Court Assignments
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="admin-form-filters-toggle">
                                        {/* <Glyphicon glyph="chevron-down" /> */}Jail Assignments
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="admin-form-filters-toggle">
                                        {/* <Glyphicon glyph="chevron-down" /> */}Escort Runs
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="admin-form-filters-toggle">
                                        {/* <Glyphicon glyph="chevron-down" /> */}Other Assignments
                                    </div>

                                    <div style={{ width: '160px' }} />
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
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <div className="container-fluid" style={{ width: '100%' }}>
                        <h3 style={{ paddingBottom: '10px', borderBottom: '1px dotted grey', color: '#003366' }}>Manage Assignment Types, Victoria Courts</h3>
                    </div>
                    <AdminForm
                        key={'admin-assignment-types-grid'}
                        templateComponent={WorkSectionsLayout}
                        showTabs={false}
                        plugins={[
                            new AdminCourtroomsPlugin(),
                            new AdminCourtRolesPlugin(),
                            // new AdminJailroomsPlugin(),
                            new AdminJailRolesPlugin(),
                            new AdminEscortTypesPlugin(),
                            new AdminOtherTypesPlugin()
                        ]}
                        isEditing={isEditing}
                    />
                </Well>
            </Page>
        );
    }
}

export default ManageCodeTypes;
