import * as React from "react";
import CreateSheriffForm from "../modules/sheriffs/containers/CreateSheriffForm";

class Settings extends React.PureComponent{
    render(){
        return (
            <div>
                <h1>Settings</h1>
                <CreateSheriffForm onSubmit={(v:any)=>{
                    console.log(v);
                }}/>
            </div>
        );
    }
}

export default Settings;