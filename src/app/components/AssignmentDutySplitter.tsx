import * as React from 'react';
import * as moment from 'moment';
import TimeSlider from './FormElements/TimeSlider';
import {
  SheriffDuty, 
  TimeType
} from '../api/Api';

export interface DutySplitterProps {
  sheriffDuties: SheriffDuty[];
  dutyStartTime: TimeType;
  dutyEndTime: TimeType;
}

export default class DutySplitter extends React.Component<DutySplitterProps> {
  render() {
    const {
      sheriffDuties,
      dutyStartTime,
      dutyEndTime
    } = this.props;

    return (
      <div>
        {
          sheriffDuties.map((sheriffDuty) =>
            <div key={sheriffDuty.id} style={{paddingBottom: 50}}>
              <h3>{`Sheriff Id: ${sheriffDuty.sheriffId}`}</h3>
              <TimeSlider
                minTime={dutyStartTime}
                maxTime={dutyEndTime}
                startTime={moment(sheriffDuty.startDateTime).toISOString()}
                endTime={moment(sheriffDuty.endDateTime).toISOString()}
              />
            </div>
        )}
      </div>
    );
  }
}
