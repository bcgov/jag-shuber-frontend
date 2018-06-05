import * as React from 'react';
import { loadIcon } from '../../infrastructure/openIconicUtils';
const Icon = loadIcon('account-logout');

export interface SheriffLoanOutIconProps {
    width?: number;
    height?: number;
    color?: string;
}
export default class SheriffLoanOutIcon extends React.PureComponent<SheriffLoanOutIconProps> {
    render() {
        const { width = 23, height = 23, color: fill = '#808080' } = this.props;
        return (
            <Icon
                style={{
                    width,
                    height,
                    fill
                }}
            />
        );
    }
}
