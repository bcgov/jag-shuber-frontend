import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Glyphicon, Table, Well } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import Page, { PageToolbar } from '../components/Page/Page';
import PageTitle from '../containers/PageTitle';

import { AdminFormProps } from '../components/AdminForm/AdminForm';

import SheriffListGrid from '../containers/SheriffListGrid';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';

export interface ManageTeamProps extends RouteComponentProps<any>{}

const DISPLAY_CARDS = 'CARDS';
const DISPLAY_LIST = 'LIST';

class ManageTeam extends React.PureComponent<AdminFormProps & Partial<ManageTeamProps>> {
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
                disableLocations={false}
                toolbar={
                    <PageToolbar
                        right={(
                            <div style={{ marginTop: 3, paddingTop: '10px' }}>
                                &nbsp;
                                <SheriffProfileCreateModal.ShowButton />
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
                    <PageTitle title={({ currentLocationName }: any) => `My Team - ${currentLocationName}`} />
                    <SheriffListGrid />
                </Well>
            </Page>
        );
    }
}

export default reduxForm({ form: 'UsersGrid' })(withRouter(ManageTeam) as any);
