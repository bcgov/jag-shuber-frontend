import * as React from 'react';
import { default as SheriffAddModal } from '../containers/SheriffAddModal';
import SheriffList from '../containers/SheriffList';
import { Well } from 'react-bootstrap';
import Page from '../components/Page/Page';

class ManageSheriffs extends React.PureComponent {
    render() {
        return (
            <Page
                toolbar={
                    <Page.Toolbar
                        right={(
                            <div style={{ marginTop: 3 }}>
                                <SheriffAddModal />
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
                        maxWidth: '80%',
                        minWidth: 800,
                        height: 'max-content',
                        margin: '0 auto'
                    }}
                >
                    <SheriffList />
                </Well>
            </Page>
        );
    }
}

export default ManageSheriffs;