import * as React from 'react';
import './AssignmentDutyInformationPanel.css';

export interface AssignmentDutyInformationPanelProps {
}

export default class AssignmentDutyInformationPanel extends React.PureComponent<AssignmentDutyInformationPanelProps> {
  render() {
    return (
      <div className="assignment-duty-information-panel">
        {this.props.children}
      </div>
    );
  }
}
