import * as React from 'react';
import { Sheriff } from '../api/index';
import {
    Image,
    Table
} from 'react-bootstrap';
import CourthouseDisplay from '../containers/CourthouseDisplay';
export interface SheriffProfileDetailsProps {
    sheriff: Sheriff;
    isCompactView?: boolean;
}

export default class SheriffProfileDetails extends React.Component<SheriffProfileDetailsProps, any>{
    render() {
        const {sheriff: {firstName, lastName, imageUrl, badgeNo, alias, homeCourthouseId = ''}} = this.props;
        return (
            <div>
                <div style={{textAlign: 'center'}}>
                    <Image src={imageUrl ? imageUrl : '/img/avatar.png'} circle={true} width="120" height="120" />
                </div>
                <Table responsive={true} >
                    <thead>
                        <tr>
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>First Name</strong></td>
                            <td>{firstName}</td>
                        </tr>
                        <tr>
                            <td><strong>Last Name</strong></td>
                            <td>{lastName}</td>
                        </tr>
                        <tr>
                            <td><strong>Rank</strong></td>
                            <td>TO DO</td>
                        </tr>
                        <tr>
                            <td><strong>Badge No</strong></td>
                            <td>{badgeNo}</td>
                        </tr>
                        <tr>
                            <td><strong>Alias</strong></td>
                            <td>{alias ? alias : '-'}</td>
                        </tr>
                        <tr>
                            <td><strong>Home Location</strong></td>
                            <td><CourthouseDisplay id={homeCourthouseId}/></td>
                        </tr>
                    </tbody>
                </Table>
                
            </div>
        );
    }
}