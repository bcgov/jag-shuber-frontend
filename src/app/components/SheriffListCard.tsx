import * as React from 'react';
import { Sheriff } from '../api/index';
import {
    Image
} from 'react-bootstrap'

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
}
export default class SheriffListCard extends React.PureComponent<SheriffListCardProps, any>{
    render() {
        const { sheriff } = this.props;
        const { imageUrl, firstName, lastName, badgeNumber } = sheriff;
        return (
            <div style={{width:200}}>
                <Image src={imageUrl} circle width="50" height="50" />
                {firstName} {lastName} <br /> #{badgeNumber}
            </div>
        );
    }
}
