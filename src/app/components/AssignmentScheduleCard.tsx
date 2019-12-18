import React from 'react';
import { WorkSectionCode } from '../api';
import {
  getWorkSectionColour
} from '../api/utils';
import { getForegroundColor } from '../infrastructure/colorUtils';
import AssignmentTitleDisplay from '../containers/AssignmentTitleDisplay';

export interface AssignmentScheduleCardProps {
  assignmentId: string;
  workSectionId: WorkSectionCode;
  title?: React.ReactNode;
  isSelected?: boolean;
}

export default class AssignmentScheduleCard extends React.Component<AssignmentScheduleCardProps, {}> {

  render() {
    const { assignmentId, workSectionId, isSelected = false } = this.props;

    const cardColor = getWorkSectionColour(workSectionId);
    const foreground = getForegroundColor(cardColor);

    const title = workSectionId
      ? <div>
        {workSectionId}
        {' - '}
        <AssignmentTitleDisplay id={assignmentId} />
      </div>
      : 'NA';

    return (
      <div
        style={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          zIndex: 70,
          fontSize: 12,
          backgroundColor: isSelected ? cardColor : 'transparent',
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: cardColor,
          color: isSelected ? foreground : 'black'
        }}
      >
        <div
          style={{
            width: '100%',
            paddingTop: 1,
            paddingBottom: 2,
            backgroundColor: cardColor,
            color: workSectionId ? foreground : cardColor
          }}
        >
          {title}
        </div>
        {/* <WorkSectionIndicator workSectionId={shift.workSectionId} orientation={'top-right'} /> */}
        {this.props.children}
      </div>
    );
  }
}
