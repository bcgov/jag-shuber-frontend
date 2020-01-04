import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Glyphicon, Well } from 'react-bootstrap';
import Page from '../components/Page/Page';

import SheriffListComposable from '../containers/SheriffListComposable';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';

export interface ManageUsersProps extends RouteComponentProps<any>{}

class ManageUsers extends React.PureComponent<Partial<ManageUsersProps>> {
    render() {
        const { history, location } = this.props;

        return (
            <Page
                toolbar={
                    <Page.Toolbar
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
                <Well
                    style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        flex: '1 1',
                        maxWidth: '85%',
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

export default withRouter(ManageUsers);
