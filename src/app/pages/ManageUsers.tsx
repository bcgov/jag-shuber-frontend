import React from 'react';
import { Well } from 'react-bootstrap';
import Page from '../components/Page/Page';

import SheriffListComposable from '../containers/SheriffListComposable';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';

class ManageUsers extends React.PureComponent {
    render() {
        return (
            <Page
                toolbar={
                    <Page.Toolbar
                        right={(
                            <div style={{ marginTop: 3 }}>
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

export default ManageUsers;
