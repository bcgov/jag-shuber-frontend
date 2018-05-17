import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import { visibleTime } from '../modules/timeline/selectors';
import { updateVisibleTime as setVisibleTime } from '../modules/timeline/actions';
import CalendarButton from '../components/CalendarButton/CalendarButton';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import ImportDefaultDutiesModal from '../containers/ImportDefaultDutiesModal';

interface DutyRosterControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface DutyRosterControlsProps {
}

interface DutyRosterDistpatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
}

class DutyRosterControls extends React.PureComponent<
    DutyRosterControlsProps & DutyRosterControlsStateProps & DutyRosterDistpatchProps> {

    render() {
        const { visibleTimeStart, visibleTimeEnd, updateVisibleTime } = this.props;
        return (
            
            <div style={{ textAlign: 'center', display: 'flex'}}>
                <Button
                    onClick={() => updateVisibleTime(
                        moment(visibleTimeStart).subtract('day', 1),
                        moment(visibleTimeEnd).subtract('day', 1)
                    )}
                    bsStyle="link" 
                    bsSize="large" 
                    style={{color: 'white'}}
                >
                    <Glyphicon glyph="chevron-left" />
                </Button>
                
                <div style={{paddingTop: 3}}>
                    <CalendarButton 
                        onChange={(selectedDate) => updateVisibleTime(
                            TimeUtils.getDefaultStartTime(moment(selectedDate)),
                            TimeUtils.getDefaultEndTime(moment(selectedDate))
                        )}
                        defaultValue={visibleTimeStart}
                        todayOnClick={() => updateVisibleTime(
                            TimeUtils.getDefaultStartTime(),
                            TimeUtils.getDefaultEndTime()
                        )}
                    />
                </div>
                <Button
                    onClick={() => updateVisibleTime(
                        moment(visibleTimeStart).add('day', 1),
                        moment(visibleTimeEnd).add('day', 1)
                    )}
                    bsStyle="link" 
                    bsSize="large" 
                    style={{color: 'white'}}
                >
                    <Glyphicon glyph="chevron-right" />
                </Button>   
                    
                <ImportDefaultDutiesModal date={visibleTimeStart}/>              
            </div>

        );
    }
}

const mapStateToProps = (state: RootState) => {
    return visibleTime(state);
};

const mapDispatchToProps = {
    updateVisibleTime: setVisibleTime
};

// tslint:disable-next-line:max-line-length
export default connect<DutyRosterControlsStateProps, DutyRosterDistpatchProps, DutyRosterControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(DutyRosterControls);