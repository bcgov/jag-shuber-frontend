import * as React from 'react';
const loanOutImg = require('open-iconic/svg/account-logout.svg');

export interface SheriffLoanInIconProps {
    width?: number;
    height?: number;
}
export default class SheriffLoanInIcon extends React.PureComponent<SheriffLoanInIconProps> {
    render() {
        const { width = 23, height = 23 } = this.props;
        return (
            <img
                src={loanOutImg}
                alt="account login"
                style={{
                    width,
                    height
                }}
            />
        );
    }
}
