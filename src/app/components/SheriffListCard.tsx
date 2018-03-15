import * as React from 'react';
import { Sheriff } from '../api/index';
import { 
    ListGroupItem
} from 'react-bootstrap';

export interface SheriffListCardProps {
    onClick?: () => void;
    sheriff: Sheriff;
}
export default class SheriffListCard extends React.PureComponent<SheriffListCardProps, any>{
    render() {
        const { sheriff } = this.props;
        const { firstName, lastName, badgeNumber } = sheriff;
        return (
            <div style={{width: 200, paddingTop: 4, paddingRight: 1.5, paddingLeft: 1.5}}>
                <ListGroupItem style={{borderColor: '#808080', borderWidth: 2, fontSize: 16}} >
                    {lastName}, {firstName.charAt(0)} 
                    <p style={{fontSize: 14}}>{badgeNumber}</p>                 
                </ListGroupItem>
            </div>
        );
    }
}
