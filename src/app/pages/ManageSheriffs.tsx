import * as React from 'react';
import { default as AddSheriffModal } from '../modules/sheriffs/components/AddSheriffModal';
import SheriffList from '../modules/sheriffs/containers/SheriffList';

export interface ManageSheriffsProps{
    
}


class ManageSheriffs extends React.PureComponent<ManageSheriffsProps, any>{
    render(){
        return (
            <div>
                <h1>Manage Sheriffs</h1>

                <SheriffList />
                <br/>
                <AddSheriffModal />

            </div>
        );
    }
}

export default ManageSheriffs;