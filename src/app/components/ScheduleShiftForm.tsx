import React from 'react';
import moment from 'moment';
import Form from './FormElements/Form';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import {
    DateType,
    TimeType,
    WorkSectionCode,
    Shift,
    WORK_SECTIONS,
    Assignment
} from '../api/Api';
import DaysOfWeekChecklist from './FormElements/DaysOfWeekChecklist';
import NumberSpinner from './FormElements/NumberSpinner';
import TimeSliderField from './FormElements/TimeSliderField';
import { getWorkSectionColour } from '../api/utils';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
//import SelectorField from './FormElements/SelectorField';
import toTitleCase from '../infrastructure/toTitleCase';
//import AssignmentSelector from '../containers/AssignmentSelector';
//import HelpPopover from './HelpPopover';
import { CourtSecurityFields, JailFeilds, EscortsFields, OtherFields } from './AssignmentForm';
export interface ScheduleShiftFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    weekStart?: DateType;
    minTime?: TimeType;
    maxTime?: TimeType;
    workSectionId?: WorkSectionCode;
    assignments?: Assignment[];
}

export default class ScheduleShiftForm extends
    React.Component<ScheduleShiftFormProps & InjectedFormProps<{}, ScheduleShiftFormProps>, {}> {

    static parseShiftFormValues(values: any): Shift {
        const { timeRange, ...shiftValues } = values;
        const updatedShift = {
            ...shiftValues,
            startDateTime: timeRange.startTime,
            endDateTime: timeRange.endTime,
        };

        return updatedShift as Shift;
    }

    static shiftToFormValues(shift: Shift) {
        return {
            ...shift,
            timeRange: {
                startTime: moment(shift.startDateTime).toISOString(),
                endTime: moment(shift.endDateTime).toISOString()
            }
        };
    }

    private renderShiftFields() {
        const {
            minTime = TimeUtils.getDefaultTimePickerMinTime().toISOString(),
            maxTime = TimeUtils.getDefaultTimePickerMaxTime().toISOString(),
            workSectionId
        } = this.props;
        return (
            <div>
                <h1>{toTitleCase(workSectionId)}</h1>
                <br/>
                <Field
                    name="timeRange"
                    component={(p) => <TimeSliderField
                        {...p}
                        minTime={minTime}
                        maxTime={maxTime}
                        timeIncrement={15}
                        color={getWorkSectionColour(workSectionId)}
                    />}
                    label="Time Range"
                />
                <br />
                <Field
                    name="days"
                    component={DaysOfWeekChecklist as any}
                    label="Days"
                    validate={[Validators.required]}
                />
                <br />
                <Field
                    name="repeatNumber"
                    component={NumberSpinner as any}
                    label="Number of FTEs required"
                    validate={[
                        Validators.required,
                        Validators.max50,
                        Validators.min1,
                        Validators.integer
                    ]}
                />
                <br/>
                {this.renderWorkSectionFields()}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Form {...this.props}>
                    {this.renderShiftFields()}
                </Form>
            </div>
        );
    }

    private renderWorkSectionFields() {
        let returnFields;
        if (this.props) {
            const { workSectionId = 'OTHER' } = this.props;

            switch (WORK_SECTIONS[workSectionId]) {
                case WORK_SECTIONS.COURTS:
                    returnFields = <CourtSecurityFields />;
                    break;
                case WORK_SECTIONS.JAIL:
                    returnFields = <JailFeilds />;
                    break;
                case WORK_SECTIONS.ESCORTS:
                    returnFields = <EscortsFields />;
                    break;
                case WORK_SECTIONS.OTHER:
                    returnFields = <OtherFields />;
                    break;
                default:
                    returnFields = '';
                    break;
            }
        } else {
            returnFields = '';
        }
        return returnFields;
    }

}