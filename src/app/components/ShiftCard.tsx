import * as React from 'react';
import * as moment from 'moment';
import { Shift } from '../api';
import {
  getWorkSectionColour
} from '../api/utils';

export interface ShiftCardProps {
  shift: Shift;
}

export default class ShiftCard extends React.Component<ShiftCardProps, {}> {

  render() {
    const { shift } = this.props;
    const { startDateTime } = shift;
    const startTime = moment.isMoment(startDateTime) ? startDateTime.format('HH:MM') : startDateTime;
    const background = getWorkSectionColour(shift.workSectionId);

    return (
      <div
        style={{          
            flex: '1',
            zindex: 70,
            position: 'relative',
            justifyContent: 'center',
            fontSize: 12,
            paddingTop: 8,
            backgroundColor: background
          }}
      >
        {startTime}
      </div>
    );
  }
}
