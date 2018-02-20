import * as React from 'react'
import {
    Glyphicon,
} from 'react-bootstrap'
import {
    AssignmentDuty
} from '../api/index';

export interface AssignmentDutyCardProps {
    onClick?: () => void;
    title?: React.ReactNode;
    duty: AssignmentDuty
}

export default class AssignmentDutyCard extends React.PureComponent<AssignmentDutyCardProps, any>{
    render() {
        const { duty } = this.props;
        const { sheriffIds, sheriffsRequired } = duty;

        const progressValue = (sheriffIds.length / Number(sheriffsRequired)) * 100;

        // todo: create util for getting background color from duty details
        const backgroundColor = '#96c0e6';
        return (
            <div style={{ backgroundColor, flex: '1' }}>
                {/* <div style={{ flex: '1' }}>
                    {title}
                </div>
                <div style={{ flex: '1' }}>
                    <i>Faces<br />Here?</i>
                </div> */}
                {/* // todo Create component for the following? */}
                <div style={{ position: "absolute", right: 2, bottom: 0 }}>
                    {progressValue >= 100
                        ? <Glyphicon glyph="ok" />
                        : <span>{sheriffIds.length}/{Number(sheriffsRequired)}</span>
                    }
                </div>
            </div>
        )



    }
}

