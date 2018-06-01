import * as React from 'react';
import * as moment from 'moment';
import {
    Well,
    Image
} from 'react-bootstrap';
import SheriffScheduleDisplay from '../../containers/SheriffScheduleDisplay';
import './DeputySchedule.css';
import api from '../../api/index';
import Client from '../../api/Client';
import CourthouseDisplay from '../../containers/CourthouseDisplay';
import ScheduleDeputyViewControls from '../../containers/ScheduleDeputyViewControls';
import ScheduleDeputyViewSelectedWeekDisplay from '../../containers/ScheduleDeputyViewSelectedWeekDisplay';

class DeputySchedule extends React.PureComponent {
    render() {
        const currentCourthouseId = (api as Client).currentCourthouse;
        return (
            <div id="deputySchedule">
                <div className="toolbar" style={{justifyContent: 'center'}}>
                    <ScheduleDeputyViewControls />
                </div>
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
                                        <ScheduleDeputyViewSelectedWeekDisplay />
                                    </div>
                                    <div>
                                        Summary as of: <i>{moment().format('dddd MMM D, YYYY HH:mm')}</i>
                                    </div>
                                </div>
                            </div>
                            <div style={{ margin: 15 }}>
                                <SheriffScheduleDisplay />
                            </div>
                        </div>

                    </Well>
                </div>
            </div>
        );
    }
}

export default DeputySchedule;