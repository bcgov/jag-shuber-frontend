import * as React from 'react';
import { default as AddSheriffModal } from '../containers/AddSheriffModal';
import SheriffList from '../containers/SheriffList';
import { Well } from 'react-bootstrap';

export interface ManageSheriffsProps{
    
}


class ManageSheriffs extends React.PureComponent<ManageSheriffsProps, any>{
    render(){
        return (
            <div style={{display: "flex", justifyContent:"center"}}>
            <Well style={{display:"flex", flexDirection: "column", flex: "1 1", maxWidth:"80%", minWidth:800}}>
                <div style={{flex: "1", alignSelf:"center", paddingBottom:15}}>
                    <h1>Manage Sheriffs</h1>
                </div>
                <SheriffList />
                <br/>
                <div style={{textAlign:"right"}}>
                <AddSheriffModal />
                </div>

            </Well>
            </div>
        );
    }
}

export default ManageSheriffs;