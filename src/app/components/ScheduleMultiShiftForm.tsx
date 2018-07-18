import React from 'react';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps,
    formValues
} from 'redux-form';
import SheriffSelector from '../containers/SheriffSelector';
import WorkSectionSelector from './FormElements/WorkSectionSelector';
import Selector from './FormElements/Selector';
import { 
    IdType, 
    ShiftUpdates 
} from '../api/Api';
import TimePickerField from './FormElements/TimePickerField';
import SelectorField from './FormElements/SelectorField';
import AssignmentSelector from '../containers/AssignmentSelector';
import HelpPopover from './HelpPopover';

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

    renderAnticipatedAssignmentField(): React.ComponentClass {
        return formValues('workSectionId')((workSectionProps: any) => {
            const { workSectionId } = workSectionProps;

            return (
                <Field
                    name="anticipatedAssignment"
                    component={(p) => <SelectorField
                        {...p}
                        SelectorComponent={
                            (sp) => <AssignmentSelector
                                {...sp}
                                workSectionId={workSectionId}
                                label="Anticipated Assignment"
                            />}

                    />}
                    fieldToolTip={
                        <HelpPopover
                            // tslint:disable-next-line:max-line-length
                            helpText={'For shift assignments already imported into the duty roster, make your edits in the duty roster.'}
                        />}
                    label="Anticipated Assignment"
                />
            );
        });
    }

    render() {
        const {
            handleSubmit,
            selectedShiftIds,
            canAssignSheriff = true,
        } = this.props;
        const AnticipatedAssignmentField = this.renderAnticipatedAssignmentField();
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <label>Time</label>
                    <Form inline={true}>
                        <Field
                            name="startTime"
                            component={
                                (p) =>
                                    <TimePickerField
                                        {...p}
                                        nullTimeLabel={
                                            (selectedShiftIds && selectedShiftIds.length > 0)
                                                ? '--:--' : 'Start'}
                                        label="Start Time"
                                    />
                            }
                        />
                        &mdash;
                        <Field
                            name="endTime"
                            component={
                                (p) =>
                                    <TimePickerField
                                        {...p}
                                        nullTimeLabel={
                                            (selectedShiftIds && selectedShiftIds.length > 0)
                                                ? '--:--' : 'End'}
                                        label="End Time"
                                    />
                            }
                        />
                    </Form>
                    <br />
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
                    <AnticipatedAssignmentField />
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
                </Form>
            </div>
        );
    }
}