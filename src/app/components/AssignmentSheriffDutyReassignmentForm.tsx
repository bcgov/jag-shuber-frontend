import React from 'react';
import moment from 'moment';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import {
    // IdType,
    TimeType,
    WorkSectionCode,
    // AssignmentDuty,
    SheriffDuty
} from '../api';
import TimePickerField from './FormElements/TimePickerField';
import Form from './FormElements/Form';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import toTitleCase from '../infrastructure/toTitleCase';
import { getWorkSectionColour } from '../api/utils';
export type DutyReassignmentDetails = {
    workSectionId?: WorkSectionCode;
    title?: string;
    sheriffFirstName?: string;
    sheriffLastName?: string;
};
export interface SheriffDutyReassignmentFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    minTime?: TimeType;
    maxTime?: TimeType;
    sourceDuty: SheriffDuty;
    targetDuty: SheriffDuty;
    sourceReassignmentDetails?: DutyReassignmentDetails;
    targetReassignmentDetails?: DutyReassignmentDetails;

}

export default class SheriffDutyReassignmentForm extends
    React.Component<SheriffDutyReassignmentFormProps & InjectedFormProps<{}, SheriffDutyReassignmentFormProps>, {}> {

    static parseSheriffDutyReassignmentFromValues(values: any): { sourceDuty: SheriffDuty, targetDuty: SheriffDuty } {
        // const { sourceDuty, targetDuty } = values;
        return values;
    }
    // static parseAssignmentDutyFromValues(values: any): AssignmentDuty {
    //     const { timeRange: { startTime, endTime }, sheriffDuties, ...rest } = values;
    //     const assignmentDuty = { ...rest };
    //     assignmentDuty.startDateTime = startTime;
    //     assignmentDuty.endDateTime = endTime;
    //     assignmentDuty.sheriffDuties = sheriffDuties.map((element: any) => ({
    //         ...element,
    //         sheriffId: element.sheriffId === '' ? undefined : element.sheriffId,
    //         startDateTime: moment(element.timeRange.startTime).toISOString(),
    //         endDateTime: moment(element.timeRange.endTime).toISOString(),
    //     }));
    //     return assignmentDuty as AssignmentDuty;
    // }

    static sheriffDutiesToFormValues() {
        const roundedCurrentTime = TimeUtils.roundTimeToNearestQuaterHour(moment()).toISOString();
        return {
            sourceDutyEndTime: roundedCurrentTime,
            targetDutyStartTime: roundedCurrentTime
        };
    }
    // static assignmentDutyToFormValues(duty: AssignmentDuty) {
    //     return {
    //         ...duty,
    //         timeRange: {
    //             startTime: moment(duty.startDateTime).toISOString(),
    //             endTime: moment(duty.endDateTime).toISOString()
    //         },
    //         sheriffDuties: duty.sheriffDuties.map((element: any) => ({
    //             ...element,
    //             sheriffId: element.sheriffId == undefined ? '' : element.sheriffId,
    //             timeRange: {
    //                 startTime: moment(element.startDateTime).toISOString(),
    //                 endTime: moment(element.endDateTime).toISOString()
    //             }
    //         }))
    //     };
    // }

    render() {
        const {
            sourceReassignmentDetails = {},
            targetReassignmentDetails = {}
        } = this.props;
        const minTime = TimeUtils.getDefaultTimePickerMinTime().toISOString();
        const maxTime = TimeUtils.getDefaultTimePickerMaxTime().toISOString();
        return (

            <div>
                <h1>
                    Move {toTitleCase(sourceReassignmentDetails.sheriffFirstName)} {toTitleCase(sourceReassignmentDetails.sheriffLastName)}
                </h1>
                <br />
                <Form {...this.props}>
                    <Field
                        name="sourceDutyEndTime"
                        component={(p) => <TimePickerField
                            {...p}
                            minTime={minTime}
                            maxTime={maxTime}
                            timeIncrement={15}
                            color={getWorkSectionColour(sourceReassignmentDetails.workSectionId)}
                            label={<h2 style={{ marginBottom: 5 }}>From {sourceReassignmentDetails.title} at</h2>}
                        />}
                    />
                    <br /><br />
                    <Field
                        name="targetDutyStartTime"
                        component={(p) => <TimePickerField
                            {...p}
                            minTime={minTime}
                            maxTime={maxTime}
                            timeIncrement={15}
                            color={getWorkSectionColour(targetReassignmentDetails.workSectionId)}
                            label={<h2 style={{ marginBottom: 5 }}>To {targetReassignmentDetails.title} at</h2>}
                        />}
                    />
                </Form>
            </div>
        );
    }
}