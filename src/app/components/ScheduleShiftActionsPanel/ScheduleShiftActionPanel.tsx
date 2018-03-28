import * as React from 'react';
import './ScheduleShiftActionPanel.css';

export interface ScheduleShiftActionsPanelProps {
}

export default class ScheduleShiftActionsPanel extends React.PureComponent<ScheduleShiftActionsPanelProps> {
  render() {
    return (
      <div className="schedule-shift-actions-panel">
        {this.props.children}
      </div>
    );
  }
}
