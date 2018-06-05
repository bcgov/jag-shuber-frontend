import * as React from 'react';
import {
    Image
} from 'react-bootstrap';
import { Sheriff } from '../../api/Api';
import './SheriffCard.css';
import SheriffLoanInIcon from '../Icons/SheriffLoanInIcon';
import SheriffLoanOutIcon from '../Icons/SheriffLoanOutIcon';

export interface SheriffCardProps {
    sheriff: Sheriff;
    onClick?: () => void;
    isLoanedIn?: boolean;
    isLoanedOut?: boolean;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any> {

    render() {
        const { 
            sheriff: {firstName, lastName, badgeNo, imageUrl}, 
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
                <div style={{position: 'relative', left: '40%', marginTop: 4 }}>
                    {isLoanedIn && <SheriffLoanInIcon />}
                    {isLoanedOut && <SheriffLoanOutIcon />} 
                </div>              
                <Image src={imageUrl ? imageUrl : '/img/avatar.png'} circle={true} width="120" height="120" />
                <br/><br/>
                {firstName} {lastName} <br /> #{badgeNo}
            </div>
        );
    }
}
