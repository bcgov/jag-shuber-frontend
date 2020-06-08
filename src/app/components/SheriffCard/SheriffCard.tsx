import React from 'react';
import {
    Image
} from 'react-bootstrap';
import { Sheriff } from '../../api/Api';
import './SheriffCard.css';
import SheriffRankDisplay from '../../containers/SheriffRankDisplay';
import avatarImg from '../../assets/images/avatar.png';
import SheriffLoanIcon from '../../containers/SheriffLoanIcon';

export interface SheriffCardProps {
    sheriff: Sheriff;
    onClick?: () => void;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any> {

    render() {
        const {
            sheriff: {
                id,
                firstName,
                lastName,
                badgeNo,
                imageUrl,
                rankCode = ''
            },
            onClick,
        } = this.props;
        return (
            <div
                key={badgeNo}
                className="sheriff-card drop-shadow-hover"
                onClick={() => onClick && onClick()}
            >
                <div style={{ position: 'relative', marginTop: 10, marginLeft: 10 }}>
                    <div style={{ width: 23, height: 23 }}>
                        <SheriffLoanIcon sheriffId={id} />
                    </div>
                </div>
                <Image src={imageUrl ? imageUrl : avatarImg} circle={true} width="127" height="132" />

                <div style={{ marginTop: 30, fontSize: 14 }}>#{badgeNo}</div>
                <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                    {firstName.toUpperCase()} {lastName.toUpperCase()}
                </div>
                <div style={{ fontSize: 14 }}><SheriffRankDisplay code={rankCode} /></div>
            </div>
        );
    }
}
