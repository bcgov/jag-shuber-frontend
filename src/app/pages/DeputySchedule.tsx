import * as React from 'react';
import * as moment from 'moment';
import {
    Well,
    Image
} from 'react-bootstrap';
import SheriffScheduleDisplay from '../containers/SheriffScheduleDisplay';
import './Pages.css';
import api from '../api/index';
import Client from '../api/Client';
import CourthouseDisplay from '../containers/CourthouseDisplay';
import ScheduleDeputyViewControls from '../containers/ScheduleDeputyViewControls';

class DeputySchedule extends React.PureComponent {
    render() {
        const currentCourthouseId = (api as Client).currentCourthouse;
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
               <div className="toolbar">
                    <ScheduleDeputyViewControls />
                </div>
                    <div style={{ flex: '1' }}>
                        <div className="deputy-schedule-header">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <Image src={'/img/BCSS_Crest.png'} style={{ width: 80 }} />
                                </div>
                                <div className="deputy-schedule-header-text">
                                    <h1>B.C. Sheriff Service</h1>
                                    <span style={{ fontStyle: 'italic', fontSize: 20 }}>
                                        Honour - Integrity - Commitment
                                </span>
                                </div>
                            </div>
                            <div className="deputy-schedule-header-date-box ">
                                <div style={{ fontSize: 18, fontWeight: 'bold', color: '#666666' }}>
                                    <CourthouseDisplay id={currentCourthouseId} /> Schedule
                            </div>
                                <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    Container for Date Display
                            </div>
                                <div>
                                    Summary as of: <i>{moment().format('dddd MMM d, YYYY HH:mm')}</i>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: 15 }}>
                            <SheriffScheduleDisplay />
                        </div>
                    </div>

                </Well>
            </div>
        );
    }
}

export default DeputySchedule;