import * as React from 'react';
import { Sheriff } from '../api/index';
import {
    Image
} from 'react-bootstrap';

export interface SheriffCardProps {
    sheriff: Sheriff;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any> {

    render() {
        const { sheriff: {firstName, lastName, badgeNo, imageUrl} } = this.props;
        const sheriffPictureUrl = imageUrl === '' ? '/img/avatar.png' : imageUrl;
        return (
            <div 
                key={badgeNo} 
                style={{ 
                    flex: '1 1 auto', 
                    padding: 4,
                    border: '1 solid transparent',
                    borderRadius: 10,
                    textAlign: 'center'
                }}
                className="drop-shadow-hover"
            >
                <Image src={sheriffPictureUrl} circle={true} width="120" height="120" />
                <br/><br/>
                {firstName} {lastName} <br /> #{badgeNo}
            </div>
        );
    }
}
