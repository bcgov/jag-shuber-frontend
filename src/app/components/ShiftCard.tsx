import * as React from 'react';
import * as moment from 'moment';
import { Shift } from '../api';
import {
  getWorkSectionColour
} from '../api/utils';
import { getForegroundColor } from '../infrastructure/colorUtils';

export interface ShiftCardProps {
  shift: Shift;
  title?: React.ReactNode;
}

export default class ShiftCard extends React.Component<ShiftCardProps, {}> {

  render() {
    const { shift } = this.props;
    const { startDateTime } = shift;
    const startTime = moment(startDateTime).format('HH:mm');
    const {
      title = startTime
    } = this.props;

    const background = getWorkSectionColour(shift.workSectionId);
    const foreground = getForegroundColor(background);

    return (
      <div
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          zindex: 70,
          justifyContent: 'space-evenly',
          fontSize: 12,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: background,
          color: foreground
        }}
      >
        <div style={{ flex: '1' }}>{title}</div>
        <div style={{ flex: '1' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
