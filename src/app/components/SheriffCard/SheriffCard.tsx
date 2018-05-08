import * as React from 'react';
import {
    Image
} from 'react-bootstrap';
import { Sheriff } from '../../api/Api';
import './SheriffCard.css';

export interface SheriffCardProps {
    sheriff: Sheriff;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any> {

    render() {
        const { sheriff: {firstName, lastName, badgeNo, imageUrl} } = this.props;
        return (
            <div 
                key={badgeNo} 
                className="sheriff-card drop-shadow-hover"
            >
                <Image src={imageUrl ? imageUrl : '/img/avatar.png'} circle={true} width="120" height="120" />
                <br/><br/>
                {firstName} {lastName} <br /> #{badgeNo}
            </div>
        );
    }
}
