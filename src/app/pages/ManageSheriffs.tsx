import * as React from 'react';
import { default as SheriffProfileAddModal } from '../containers/SheriffProfileAddModal';
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
                                <SheriffProfileAddModal />
                            </div>
                        )}
                    />
                }
            >
                
                <div style={{alignSelf: 'center', paddingBottom: 15}}>
                    <h1>Manage Sheriffs</h1>
                </div>
                <div style={{textAlign: 'right'}}>
                    <SheriffProfileAddModal />
                </div><br/>
                <SheriffList />
            </Page>
        );
    }
}

export default ManageSheriffs;