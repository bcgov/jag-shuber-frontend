import * as React from 'react';
import { Shift } from '../api';
import {
  getWorkSectionColour
} from '../api/utils';
import { getForegroundColor } from '../infrastructure/colorUtils';
import ScheduleShiftActionsPanel from './ScheduleShiftActionsPanel/ScheduleShiftActionPanel';
import ScheduleShiftEditModal from '../containers/ScheduleShiftEditModal';

export interface ShiftCardProps {
  shift: Shift;
  title?: React.ReactNode;
}

export default class ShiftCard extends React.Component<ShiftCardProps, {}> {

  render() {
    const { shift } = this.props;

    const background = getWorkSectionColour(shift.workSectionId);
    const foreground = getForegroundColor(background);

    return (
      <div
       
        style={{ 
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          zindex: 70,
          fontSize: 12,
          paddingTop: 19,
          backgroundColor: background,
          color: foreground
        }}
      >
        <div style={{flex: '1'}}>
          {this.props.children}
          <ScheduleShiftActionsPanel>
            <ScheduleShiftEditModal color={foreground} shiftId={shift.id} />
          </ScheduleShiftActionsPanel>
        </div>
      </div>
    );
  }
}
