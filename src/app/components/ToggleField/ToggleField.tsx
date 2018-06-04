import * as React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './ToggleField.css';

export interface ToggleFieldProps {
  defaultChecked?: boolean;
  checkedLabel?: React.ReactNode;
  uncheckedLabel?: React.ReactNode;
  onChange: () => void;
}

export default class ToggleField extends React.Component<ToggleFieldProps, any> {
  render() {
    const { defaultChecked, checkedLabel, uncheckedLabel, onChange } = this.props;
    return (
      <Toggle
        style={{ marginRight: 5 }}
        defaultChecked={defaultChecked}
        onChange={() => onChange && onChange()}
        icons={{
          checked: checkedLabel,
          unchecked: uncheckedLabel,
        }}
      />
    );
  }
}
