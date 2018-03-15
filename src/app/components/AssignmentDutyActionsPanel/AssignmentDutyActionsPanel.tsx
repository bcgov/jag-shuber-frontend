import * as React from 'react';
import './AssignmentDutyActionsPanel.css';

export interface AssignmentDutyActionsPanelProps {
}

export default class AssignmentDutyActionsPanel extends React.PureComponent<AssignmentDutyActionsPanelProps> {
  render() {
    return (
      <div className="assignment-duty-actions-panel">
        {this.props.children}
      </div>
    );
  }
}
