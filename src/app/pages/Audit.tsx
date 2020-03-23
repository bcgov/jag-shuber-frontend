import React from 'react';
// import SheriffList from '../containers/SheriffList';
import { Well } from 'react-bootstrap';
import Page, { PageToolbar } from '../components/Page/Page';
import SheriffProfileCreateModal from '../containers/SheriffProfileCreateModal';

class Audit extends React.PureComponent {
    render() {
        return (
            <Page
                toolbar={
                    <PageToolbar
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
                        height: 'max-content',
                        margin: '0 auto',
                        borderRadius: 0
                    }}
                >
                    {/*<SheriffList />*/}
                </Well>
            </Page>
        );
    }
}

export default Audit;
