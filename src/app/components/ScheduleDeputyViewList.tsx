import * as React from 'react';
import { Table } from 'react-bootstrap';
import { 
    SheriffShiftDisplay 
} from '../api/Api';
import CirlceIconWithText from '../components/Icons/CircleIconWithText';

export interface ScheduleDeputyViewListProps {
    weekDayLabels: string[];
    sheriffShifts: SheriffShiftDisplay[];
    includeWorkSection?: boolean;
}
export default class ScheduleDeputyViewList extends React.PureComponent<ScheduleDeputyViewListProps> {
    render() {
        const { weekDayLabels, sheriffShifts, includeWorkSection = true } = this.props;
        return (
            <div>
                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Name</th>
                            {weekDayLabels.map(wd => <th key={wd}>{wd}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {sheriffShifts.map(ss => {
                            return (
                                <tr id={ss.sheriffName}>
                                    <td>{ss.sheriffName}</td>
                                    {ss.details.map(details => {
                                        const {workSectionId, time} = details;
                                        return (
                                        <td>
                                            {time}{includeWorkSection && <CirlceIconWithText text={workSectionId.charAt(0)}/>} 
                                        </td>)})}
                                </tr>
                            );
                        })}        
                    </tbody>
                </Table>
            </div>
        );
    }
}