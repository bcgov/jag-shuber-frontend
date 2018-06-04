import * as React from 'react';
import { default as ReactToggle } from 'react-toggle';
import 'react-toggle/style.css';
import './Toggle.css';

export interface ToggleProps {
  defaultChecked?: boolean;
  checkedLabel?: React.ReactNode;
  uncheckedLabel?: React.ReactNode;
  onChange: () => void;
}

export default class Toggle extends React.Component<ToggleProps, any> {
  render() {
    const { defaultChecked, checkedLabel, uncheckedLabel, onChange } = this.props;
    return (
      <ReactToggle
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
