import * as React from 'react';
import {
    Table,
    Glyphicon
} from 'react-bootstrap';
import DateDisplay from './DateDisplay';

export interface SheriffTrainingDetailsProps {
    isCompactView?: boolean;
}

export default class SheriffTrainingDetails extends React.Component<SheriffTrainingDetailsProps, {}> {
   trainingStatusStyle(): string { 
        return 'text-success';
    }
    
    render() {
        const { isCompactView = false} = this.props;
        const training = [
            { certificationDate: 'Mon Jan 20 2017', expiryDate: 'Mon Jan 20 2018', trainingType: 'FRO' },
            { certificationDate: 'Mon Jan 20 2017', expiryDate: 'Mon Jan 20 2018', trainingType: 'PISTOL' },
            { certificationDate: 'Mon Jan 20 2017', expiryDate: 'Mon Jan 20 2018', trainingType: 'CID' },
            { certificationDate: 'Mon Jan 20 2017', expiryDate: 'Mon Jan 20 2018', trainingType: 'CEW' }
        ];
        return (
            <div>
                <h3>Training</h3>
                { training.length > 0 && (
                    <Table responsive={true}>
                        <thead>
                            <tr >
                                <th className="text-left">Type</th>
                                { !isCompactView && <th className="text-left">Cert</th>}
                                { !isCompactView && <th className="text-left">Expiry</th>}
                                <th className="text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {training.map(function (training, index) {
                        return (
                                <tr key={index}>
                                    <td>{training.trainingType}</td>
                                    { !isCompactView && 
                                        <td>
                                            <DateDisplay 
                                                date={training.certificationDate} 
                                                showMonth={true} 
                                                showDay={true} 
                                                showYear={true}
                                            />
                                        </td>}
                                    { !isCompactView 
                                        && <td>
                                            <DateDisplay 
                                                date={training.expiryDate} 
                                                showMonth={true} 
                                                showDay={true} 
                                                showYear={true}
                                            />
                                        </td>}
                                    <td><Glyphicon glyph="ok" className="text-success"/></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table> )}
                {  training.length === 0 && (
                    <span className="text-danger">No training recorded. </span>
                )}
            </div>
        );
    }
}