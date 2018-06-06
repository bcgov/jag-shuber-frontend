import * as React from 'react';
import { default as SheriffAddModal } from '../containers/SheriffAddModal';
import SheriffList from '../containers/SheriffList';
import { Well } from 'react-bootstrap';

class ManageSheriffs extends React.PureComponent {
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Well 
                style={{
                    display: 'flex', 
                    backgroundColor: 'white', 
                    flexDirection: 'column', 
                    flex: '1 1', 
                    maxWidth: '80%', 
                    minWidth: 800
                }}
            >
                
                <div style={{alignSelf: 'center', paddingBottom: 15}}>
                    <h1>Manage Sheriffs</h1>
                </div>
                <div style={{textAlign: 'right'}}>
                    <SheriffAddModal />
                </div><br/>
                <SheriffList />
            </Well>
            </div>
        );
    }
}

export default ManageSheriffs;