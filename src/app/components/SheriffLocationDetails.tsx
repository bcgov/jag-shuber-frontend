import * as React from 'react';
import {
    Table
} from 'react-bootstrap';
import CourthouseCard from './CourthouseCard';
import RegionCard from './RegionCard';
import { 
    SheriffLocation,
    BLANK_SHERIFF_LOCATION
} from '../api';

export interface SheriffLocationDetailsProps {
    currentLocation?: SheriffLocation,
    permanentLocation?: SheriffLocation
}

export default class SheriffLocationDetails extends React.Component<SheriffLocationDetailsProps, any>{
    render() {
        const { currentLocation=BLANK_SHERIFF_LOCATION, permanentLocation=BLANK_SHERIFF_LOCATION  } = this.props;
        return (
            <div>
                <h3>Region and Courthouse</h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th> </th>
                            <th className="text-left">Courthouse</th>
                            <th className="text-left">Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Permanent</strong></td>
                            <td><CourthouseCard location={permanentLocation}/></td>
                            <td><RegionCard location={permanentLocation} /></td>
                        </tr>
                        <tr>
                            <td><strong>Current</strong></td>
                            <td><CourthouseCard location={currentLocation}/></td>
                            <td><RegionCard location={currentLocation} /></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}