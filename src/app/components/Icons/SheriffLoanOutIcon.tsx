import * as React from 'react';
import { loadIcon } from '../../infrastructure/openIconicUtils';
const Icon = loadIcon('account-logout');

export interface SheriffLoanInIconProps {
    width?: number;
    height?: number;
}
export default class SheriffLoanInIcon extends React.PureComponent<SheriffLoanInIconProps> {
    render() {
        const { width = 23, height = 23 } = this.props;
        return (
            <Icon
                style={{
                    width,
                    height,
                    fill: 'red'
                }}
            />
        );
    }
}
