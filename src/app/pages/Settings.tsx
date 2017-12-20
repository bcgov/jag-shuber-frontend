import * as React from 'react';
import CreateSheriffForm from '../modules/sheriffs/containers/CreateSheriffForm';

export interface SettingsProps{

}
class Settings extends React.PureComponent<SettingsProps, any>{
    render(){
       
        return (
            <div>
                <h1>Settings</h1>
                <CreateSheriffForm />
            </div>
        );
    }
}

export default Settings;