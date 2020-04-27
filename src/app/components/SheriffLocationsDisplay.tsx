import React from 'react';
import { SheriffLocation } from '../api';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import LocationDisplay from '../containers/LocationDisplay';

export interface SheriffLocationsDisplayProps {
    locations: SheriffLocation[];
}

export default class SheriffLocationsDisplay extends React.PureComponent<SheriffLocationsDisplayProps, any> {
    render() {
        const { locations = [] } = this.props;
        return (
            <div>
                <h3>Locations</h3>
                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Start Date</th>
                            <th className="text-left">End Date</th>
                            <th className="text-left">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map(l => {
                            return (
                                <tr key={l.id}>
                                    <td>{moment(l.startDate).format('MMM D, YYYY')}</td>
                                    <td>{moment(l.endDate).format('MMM D, YYYY')}</td>
                                    <td><LocationDisplay id={l.locationId} /></td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>
            </div>
        );
    }
}
