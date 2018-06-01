import * as React from 'react';
import { 
    Well,
    Image 
} from 'react-bootstrap';
import SheriffScheduleDisplay from '../containers/SheriffScheduleDisplay';
import './Pages.css';

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
                <div style={{flex: '1'}}>
                    <div className="deputy-schedule-header">
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                                <Image src={'/img/BCSS_Crest.png'} style={{width: 80}}/>
                            </div>
                            <div className="deputy-schedule-header-text">
                                <h1>B.C. Sheriff Service</h1>
                                <span style={{fontStyle: 'italic', fontSize: 20}}>
                                    Honour - Integrity - Commitment
                                </span>
                            </div>
                        </div>
                        <div className="deputy-schedule-header-date-box ">
                            DATE BOX
                        </div>
                    </div>
                    <div style={{margin: 15}}>
                        <SheriffScheduleDisplay/>
                    </div>
                </div>
               
            </Well>
            </div>
        );
    }
}

export default DeputySchedule;