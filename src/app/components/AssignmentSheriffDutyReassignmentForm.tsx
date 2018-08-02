import React from 'react';
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

export interface AssignmentDutyFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    minTime?: TimeType;
    maxTime?: TimeType;
    workSectionId?: WorkSectionCode;
    sourceDuty: SheriffDuty;
    targetDuty: SheriffDuty;
}

export default class AssignmentDutyForm extends
    React.Component<AssignmentDutyFormProps & InjectedFormProps<{}, AssignmentDutyFormProps>, {}> {

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
        // const {} = this.props;
        const minTime = TimeUtils.getDefaultTimePickerMinTime().toISOString();
        const maxTime = TimeUtils.getDefaultTimePickerMaxTime().toISOString();
        return (
            
            <div>
                {/* <h1 style={{ marginBottom: 20 }}>{assignmentTitle}</h1> */}
                <Form {...this.props}>
                    <Field
                        name="sourceDutyEndTime"
                        component={(p) => <TimePickerField
                            {...p}
                            minTime={minTime}
                            maxTime={maxTime}
                            timeIncrement={15}
                            color={'red'}
                            label={<h2 style={{ marginBottom: 5 }}>End Time @</h2>}
                        />}
                    />
                    <Field
                        name="targetDutyStartTime"
                        component={(p) => <TimePickerField
                            {...p}
                            minTime={minTime}
                            maxTime={maxTime}
                            timeIncrement={15}
                            color={'red'}
                            label={<h2 style={{ marginBottom: 5 }}>Start Time @</h2>}
                        />}
                    />
                </Form>
            </div>
        );
    }
}