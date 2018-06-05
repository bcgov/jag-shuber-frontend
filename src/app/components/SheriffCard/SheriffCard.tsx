import React from 'react';
import {
    Image
} from 'react-bootstrap';
import { Sheriff } from '../../api/Api';
import './SheriffCard.css';
import SheriffLoanInIcon from '../Icons/SheriffLoanInIcon';
import SheriffLoanOutIcon from '../Icons/SheriffLoanOutIcon';
import SheriffRankDisplay from '../../containers/SheriffRankDisplay';

export interface SheriffCardProps {
    sheriff: Sheriff;
    onClick?: () => void;
    isLoanedIn?: boolean;
    isLoanedOut?: boolean;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any> {

    render() {
        const {
            sheriff: { firstName, lastName, badgeNo, imageUrl, rankCode = '' },
            onClick,
            isLoanedIn = false,
            isLoanedOut = false
        } = this.props;
        return (
            <div
                key={badgeNo}
                className="sheriff-card drop-shadow-hover"
                onMouseDown={() => onClick && onClick()}
            >
                <div style={{ position: 'relative', right: '40%', marginTop: 10 }}>
                    {isLoanedIn && <SheriffLoanInIcon />}
                    {isLoanedOut && <SheriffLoanOutIcon />}
                    {!isLoanedIn && !isLoanedOut && <div style={{ width: 23, height: 23 }} />}
                </div>
                <Image src={imageUrl ? imageUrl : '/img/avatar.png'} circle={true} width="127" height="132" />
               
                <div style={{marginTop: 30, fontSize: 14}}>#{badgeNo}</div>
                <div style={{fontWeight: 'bold', fontSize: 18}}>{firstName.toUpperCase()} {lastName.toUpperCase()}</div>
                <div style={{fontSize: 14}}><SheriffRankDisplay code={rankCode} /></div>
            </div>
        );
    }
}
