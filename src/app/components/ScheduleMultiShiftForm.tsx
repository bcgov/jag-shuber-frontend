import React from 'react';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import SheriffSelector from '../containers/SheriffSelector';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import Selector from './FormElements/Selector';
import { IdType, ShiftUpdates } from '../api/Api';
import TimePickerDropDownField from './FormElements/TimePickerDropDownField';
import SelectorField from './FormElements/SelectorField';

export interface ScheduleMultiShiftFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    selectedShiftIds?: IdType[];
    canAssignSheriff?: boolean;
}

export default class ScheduleMultiShiftForm extends
    React.Component<ScheduleMultiShiftFormProps & InjectedFormProps<{}, ScheduleMultiShiftFormProps>, {}> {

    static parseUpdateDetailsFromValues(values: any): ShiftUpdates {
        const { sheriffId, startTime, endTime, workSectionId } = values;

        return {
            sheriffId: !Selector.isVaried(sheriffId) ? sheriffId : undefined,
            startTime,
            endTime,
            workSectionId: !Selector.isVaried(workSectionId) ? workSectionId : undefined
        } as ShiftUpdates;
    }

    render() {
        const {
            handleSubmit,
            selectedShiftIds,
            canAssignSheriff = true,
        } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Field
                        name="sheriffId"
                        component={(p) => <SelectorField
                            {...p}
                            SelectorComponent={
                                (sp) =>
                                    <SheriffSelector {...sp} showVariedOption={true} isDisabled={canAssignSheriff} />}
                        />}
                        label="Sheriff"
                    />
                    <label>Start Time</label>
                    <Field
                        name="startTime"
                        component={
                            (p) => {
                                return <TimePickerDropDownField
                                    {...p}
                                    nullTimeLabel={
                                        (selectedShiftIds && selectedShiftIds.length > 0)
                                            ? '--:--' : 'Start'}
                                />
                            }
                        }
                    />
                    <label>End Time</label>
                    <Field
                        name="endTime"
                        component={
                            (p) =>
                                <TimePickerDropDownField
                                    {...p}
                                    nullTimeLabel={
                                        (selectedShiftIds && selectedShiftIds.length > 0)
                                            ? '--:--' : 'End'}
                                />
                        }
                    />
                    <Field
                        name="workSectionId"
                        component={(p) => <SelectorField
                            {...p}
                            SelectorComponent={
                                (sp) =>
                                    <WorkSectionSelector {...sp} showVariedOption={true} />}
                        />}
                        label="Work Section"
                    />
                </Form>
            </div>
        );
    }
}