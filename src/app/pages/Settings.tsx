import * as React from "react";
import SheriffForm from "../modules/sheriffs/components/SheriffForm";

class Settings extends React.PureComponent{
    render(){
        return (
            <div>
                <h1>Settings</h1>
                <SheriffForm />
            </div>
        );
    }
}

export default Settings;