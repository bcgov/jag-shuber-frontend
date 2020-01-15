import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Glyphicon, Table, Well } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import Page, { PageToolbar } from '../components/Page/Page';

import { User } from '../api';

import SheriffListComposable from '../containers/SheriffListComposable';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';
import DataTableFilterRow from '../components/Table/DataTableFilterRow';
import DataTable from '../components/Table/DataTable';
import GenderCodeDisplay from '../containers/GenderCodeDisplay';
import LocationDisplay from '../plugins/AdminRoles/containers/LocationDisplay';
import LocationSelector from '../containers/LocationSelector';
import SheriffRankDisplay from '../plugins/AdminRoles/containers/SheriffRankDisplay';
import SheriffRankCodeSelector from '../containers/SheriffRankCodeSelector';
import GenderSelector from '../containers/GenderSelector';

export interface ManageUsersProps extends RouteComponentProps<any>{}

class ManageUsers extends React.PureComponent<Partial<ManageUsersProps>> {
    render() {
        const { history, location } = this.props;

        return (
            <Page
                toolbar={
                    <PageToolbar
                        left={(
                            <div style={{ flex: 1, display: 'flex', position: 'relative', justifyContent: 'center', paddingTop: '10px' }}>
                                <div className="admin-form-filters-toggle">
                                    <Glyphicon glyph="chevron-right" />&nbsp;&nbsp;Display User Search Filters
                                </div>
                            </div>
                        )}
                        right={(
                            <div style={{ marginTop: 3, paddingTop: '10px' }}>
                                &nbsp;
                                <Button
                                    bsStyle="secondary"
                                    onClick={(): void => {
                                        if (history) history.push('/roles/assign');
                                    }}
                                >
                                    <Glyphicon glyph="th-list" /> View as List
                                </Button>
                                &nbsp;&nbsp;
                                {/* <Button
                                    bsStyle="secondary"
                                    onClick={(): void => {
                                        if (history) history.push('/users/manage');
                                    }}
                                >
                                    <Glyphicon glyph="th" /> View as Grid
                                </Button>
                                &nbsp;&nbsp; */}
                                <SheriffProfileCreateModal.ShowButton />
                                &nbsp;&nbsp;
                                {/* <SheriffProfileModal.ShowButton
                                    sheriffId={'90b48bc8-5cc2-48f3-8b28-d7121298a449'}
                                >
                                    Try This
                                </SheriffProfileModal.ShowButton> */}
                            </div>
                        )}
                    />
                }
            >
                {/* TODO: Note! This isn't a data table, just re-using some stuff that we'll refactor later... */}
                {/* <div className="fixed-filters-data-table">
                    <div className="data-table">
                        <div className="data-table-filter-row">
                            <Table striped={true}>
                                <thead>
                                    <DataTableFilterRow<Partial<User>>
                                        fieldName={'userFilters'}
                                        columns={[
                                            DataTable.StaticTextColumn('Full Name', {
                                                fieldName: 'displayName',
                                                colStyle: { width: '300px' },
                                                displayInfo: false,
                                                filterable: true,
                                                // filterColumn: onFilterDisplayName
                                            }),
                                            // DataTable.StaticTextColumn('Last Name', { fieldName: 'lastName', colStyle: { width: '175px' }, displayInfo: false, filterable: true }),
                                            // TODO: We temporarily disabled filtering on badgeNo, it's tied to the sheriff, not sure how to handle that case yet...
                                            DataTable.StaticTextColumn('Badge No.', {
                                                fieldName: 'sheriff.badgeNo',
                                                colStyle: { width: '175px' },
                                                displayInfo: false,
                                                filterable: true,
                                                // filterColumn: onFilterBadgeNo
                                            }),
                                            DataTable.MappedTextColumn('Rank', {
                                                fieldName: 'sheriff.rankCode',
                                                colStyle: { width: '175px' },
                                                selectorComponent: SheriffRankDisplay,
                                                filterSelectorComponent: SheriffRankCodeSelector,
                                                displayInfo: false,
                                                filterable: true,
                                                // filterColumn: onFilterRank
                                            }),
                                            DataTable.MappedTextColumn('Gender', {
                                                fieldName: 'sheriff.genderCode',
                                                colStyle: { width: '175px' },
                                                selectorComponent: GenderCodeDisplay,
                                                filterSelectorComponent: GenderSelector,
                                                displayInfo: false,
                                                filterable: true,
                                                // filterColumn: onFilterGender
                                            }),
                                            DataTable.MappedTextColumn('Home Location', {
                                                fieldName: 'sheriff.homeLocationId',
                                                colStyle: { width: '225px' },
                                                selectorComponent: LocationDisplay,
                                                filterSelectorComponent: LocationSelector,
                                                displayInfo: false,
                                                filterable: true,
                                                // filterColumn: onFilterHomeLocation
                                            }),
                                            DataTable.MappedTextColumn('Current Location', {
                                                fieldName: 'sheriff.currentLocationId',
                                                colStyle: { width: '250px' },
                                                selectorComponent: LocationDisplay,
                                                filterSelectorComponent: LocationSelector,
                                                displayInfo: false,
                                                filterable: true,
                                                // filterColumn: onFilterCurrentLocation
                                            }),
                                            // DataTable.DateColumn('Date Created', 'createdDtm'),
                                            // DataTable.SelectorFieldColumn('Status', { displayInfo: true }), // No point really in setting the status here

                                        ]}
                                        filterable={true}
                                        expandable={true}
                                    />
                                </thead>
                            </Table>
                        </div>
                    </div>
                </div> */}
                <Well
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '93%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    <SheriffListComposable />
                </Well>
            </Page>
        );
    }
}

export default reduxForm({ form: 'UsersGrid' })(withRouter(ManageUsers) as any);
