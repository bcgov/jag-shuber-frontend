import * as React from 'react';
import { Sheriff } from '../api/Api';

interface SheriffDisplayProps {
    sheriff?: Sheriff;
    style?: React.CSSProperties;
}

export default class SheriffDisplay extends React.PureComponent<SheriffDisplayProps & SheriffDisplayProps> {
    render() {
        const {
            sheriff,
            style
        } = this.props;

        return (
            // tslint:disable:triple-equals
            // using != below vs !== because it checks for null and undefined
            <div style={{ ...style }}>
                {sheriff != undefined ? sheriff.lastName.toUpperCase() : ''}
            </div>
        );
    }
}
