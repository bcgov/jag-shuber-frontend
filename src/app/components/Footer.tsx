import * as React from 'react';
import Legend from './Legend/Legend';

export interface FooterProps {

}

export default class Footer extends React.PureComponent<FooterProps> {
    render() {
        return (
            <div id="footer">
                <Legend />
            </div>
        );
    }
}