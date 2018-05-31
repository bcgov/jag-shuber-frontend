import * as React from 'react';
import { Table } from 'react-bootstrap';
import {
    SheriffShiftDisplay
} from '../api/Api';
import CirlceIconWithText from '../components/Icons/CircleIconWithText';
import { getWorkSectionColour } from '../api/utils';
import { getForegroundColor } from '../infrastructure/colorUtils';

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
                                <tr id={ss.sheriffName} key={ss.sheriffName}>
                                    <td>{ss.sheriffName}</td>
                                    {ss.details.map(details => {
                                        const { workSectionId, time } = details;
                                        const backgroundColor = getWorkSectionColour(workSectionId);
                                        const foregroundColor = getForegroundColor(backgroundColor);
                                        return (
                                            <td key={details.time}>
                                                <div style={{ display: 'flex' }}>{includeWorkSection &&
                                                    <CirlceIconWithText
                                                        text={workSectionId ? workSectionId.charAt(0) : ''}
                                                        backgroundColor={backgroundColor}
                                                        borderColor={backgroundColor}
                                                        color={foregroundColor}
                                                    />}
                                                    <span style={{marginTop: 3, marginLeft: 5}}>{time}</span>
                                                </div>
                                            </td>);
                                    })};
                                </tr>
                            );
                        })};
                    </tbody>
                </Table>
            </div>
        );
    }
}