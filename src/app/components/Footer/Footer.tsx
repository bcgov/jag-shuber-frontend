import * as React from 'react';
import Legend from '../Legend/Legend';
import {
  Glyphicon,
  Collapse
} from 'react-bootstrap';
import './Footer.css';

export interface FooterProps {
  isInitallyCollapsed?: boolean;
}

export default class Footer extends React.PureComponent<FooterProps, { isCollapsed: boolean }> {

  constructor(props: any, context: any) {
    super(props, context);
    const { isInitallyCollapsed: isCollapsed = false } = props;
    this.state = { isCollapsed };
  }

  render() {
    const { isCollapsed } = this.state;
    return (
      <div className="footerContainer">
        <div
          className="footerArrowBackground"
          onClick={() => this.setState({ isCollapsed: !this.state.isCollapsed })}
        >
          <Glyphicon className="footerArrow" glyph={!isCollapsed ? 'arrow-down' : 'arrow-up'} />
        </div>
        <div id="footer">
          <Collapse in={!isCollapsed}>
            <div>
              <div style={{backgroundColor: '#003366', height: 5}}/>
                <Legend />
              <div style={{backgroundColor: '#003366', height: 5}}/>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}