import React from 'react';
import { Shift } from '../api';
import {
  getWorkSectionColour
} from '../api/utils';
import { getForegroundColor } from '../infrastructure/colorUtils';
import AssignmentTitleDisplay from '../containers/AssignmentTitleDisplay';

export interface ShiftCardProps {
  shift: Shift;
  title?: React.ReactNode;
  isSelected?: boolean;
  isAssigned?: boolean;
}

export default class ShiftCard extends React.Component<ShiftCardProps, {}> {

  render() {
    const { shift, isSelected = false, isAssigned = false } = this.props;

    const shiftColor = getWorkSectionColour(shift.workSectionId);
    const foreground = getForegroundColor(shiftColor);

    const shiftTitle = shift.workSectionId
      ? <div>
        {shift.workSectionId.charAt(0)}
        {shift.assignmentId ? ' - ' : ''}
        <AssignmentTitleDisplay id={shift.assignmentId} />
      </div>
      : 'NA';

    return (
      <div
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          zindex: 70,
          fontSize: 12,
          backgroundColor: isSelected ? shiftColor : 'transparent',
          borderWidth: isAssigned ? 1 : 3,
          borderStyle: 'solid',
          borderColor: shiftColor,
          color: isSelected ? foreground : 'black'
        }}
      >
        <div
          style={{
            width: '100%',
            paddingTop: 1,
            paddingBottom: 2,
            backgroundColor: shiftColor,
            color: shift.workSectionId ? foreground : shiftColor
          }}
        >
          {shiftTitle}
        </div>
        {/* <WorkSectionIndicator workSectionId={shift.workSectionId} orientation={'top-right'} /> */}
        {this.props.children}
      </div>
    );
  }
}
