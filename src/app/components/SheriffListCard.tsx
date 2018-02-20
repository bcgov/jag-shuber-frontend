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
        const { firstName, lastName } = sheriff;
        return (
            <div style={{width:200, paddingTop:2, paddingRight:2, paddingLeft:2}}>
                <ListGroupItem style={{borderColor:'#002663', borderWidth:3}} >
                    <h3>{lastName}, {firstName.charAt(0)}</h3>                 
                </ListGroupItem>
            </div>
        );
    }
}
