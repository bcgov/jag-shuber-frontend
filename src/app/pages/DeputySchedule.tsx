import * as React from 'react';
import { Well } from 'react-bootstrap';
import SheriffScheduleDisplay from '../containers/SheriffScheduleDisplay';

class DeputySchedule extends React.PureComponent {
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
                
                <div style={{flex: '1', alignSelf: 'center', paddingBottom: 15}}>
                    <h1>Deputy Schedule</h1>
                    <SheriffScheduleDisplay/>
                </div>
               
            </Well>
            </div>
        );
    }
}

export default DeputySchedule;