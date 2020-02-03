import React from 'react';
import { Glyphicon, Well } from 'react-bootstrap';

import Page, { PageToolbar } from '../components/Page/Page';

import AdminForm from '../containers/AdminForm';
import { AdminFormProps } from '../components/AdminForm/AdminForm';
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
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                <h3 style={{ color: 'white', fontWeight: 'bold' }}>Work Section</h3>
                            </div>
                        )}
                        middle={(
                            <>
                                <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                    <div className="admin-form-filters-toggle">
                                        {/* <Glyphicon glyph="chevron-down" /> */}&nbsp;&nbsp;Courts
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="admin-form-filters-toggle">
                                        {/* <Glyphicon glyph="chevron-down" /> */}&nbsp;&nbsp;Jails
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="admin-form-filters-toggle">
                                        {/* <Glyphicon glyph="chevron-down" /> */}&nbsp;&nbsp;Escort Runs
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="admin-form-filters-toggle">
                                        {/* <Glyphicon glyph="chevron-down" /> */}&nbsp;&nbsp;Other
                                    </div>
                                </div>
                            </>
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
                        maxWidth: '100%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <AdminForm
                        key={'admin-assignment-types-grid'}
                        /* plugins={{
                            courts: [
                                new AdminCourtroomsPlugin(),
                                new AdminCourtRolesPlugin(),
                            ],
                            jails: [
                                // new AdminJailroomsPlugin(),
                                new AdminJailRolesPlugin()
                            ],
                            escortRuns: [
                                new AdminEscortTypesPlugin()
                            ],
                            otherTypes: [
                                new AdminOtherTypesPlugin()
                            ]
                        }} */
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
