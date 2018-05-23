import * as React from 'react';
import * as moment from 'moment';
import {
    Field,
    InjectedFormProps,
    FieldArray,
    formValues
} from 'redux-form';
import {
    IdType,
    TimeType,
    WorkSectionCode,
    AssignmentDuty,
    SheriffDuty
} from '../api';
import TimeSliderField from './FormElements/TimeSliderField';
import { getWorkSectionColour } from '../api/utils';
import {
    ListGroup,
    ListGroupItem,
    Button,
    Glyphicon,
    Form
} from 'react-bootstrap';
import SheriffSelector from '../containers/SheriffSelector';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';
import TextArea from './FormElements/TextArea';
import { ConfirmationModal } from './ConfirmationModal';
import FormWrapper from './FormElements/FormWrapper';

export interface AssignmentDutyFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    onRemoveSheriffDuty?: (id: string) => void;
    assignmentTitle?: string;
    assignmentId?: IdType;
    minTime?: TimeType;
    maxTime?: TimeType;
    workSectionId?: WorkSectionCode;
    isNewDuty?: boolean;
}

interface SheriffDutyFieldProps {
    id?: IdType;
    timeRange: {
        startTime: TimeType;
        endTime: TimeType;
    };
}

class SheriffDutyFieldArray extends FieldArray<SheriffDutyFieldProps | Partial<SheriffDuty>> {
}
export default class AssignmentDutyForm extends
    React.Component<AssignmentDutyFormProps & InjectedFormProps<{}, AssignmentDutyFormProps>, {}> {

    static parseAssignmentDutyFromValues(values: any): AssignmentDuty {
        const { timeRange: { startTime, endTime }, sheriffDuties, ...rest } = values;
        const assignmentDuty = { ...rest };
        assignmentDuty.startDateTime = startTime;
        assignmentDuty.endDateTime = endTime;
        assignmentDuty.sheriffDuties = sheriffDuties.map((element: any) => ({
            ...element,
            sheriffId: element.sheriffId === '' ? undefined : element.sheriffId,
            startDateTime: moment(element.timeRange.startTime).toISOString(),
            endDateTime: moment(element.timeRange.endTime).toISOString(),
        }));
        return assignmentDuty as AssignmentDuty;
    }

    static assignmentDutyToFormValues(duty: AssignmentDuty) {
        return {
            ...duty,
            timeRange: {
                startTime: moment(duty.startDateTime).toISOString(),
                endTime: moment(duty.endDateTime).toISOString()
            },
            sheriffDuties: duty.sheriffDuties.map((element: any) => ({
                ...element,
                sheriffId: element.sheriffId == undefined ? '' : element.sheriffId,
                timeRange: {
                    startTime: moment(element.startDateTime).toISOString(),
                    endTime: moment(element.endDateTime).toISOString()
                }
            }))
        };
    }

    renderSheriffDutyFieldsComponent(): React.ComponentClass {
        const {
            onRemoveSheriffDuty
        } = this.props;
        return formValues('timeRange')((timeRangeProps: any) => {
            const {
                timeRange: {
                    startTime: minTime = TimeUtils.getDefaultStartTime().toISOString(),
                    endTime: maxTime = TimeUtils.getDefaultEndTime().toISOString()
                }
            } = timeRangeProps;
            return (
                <SheriffDutyFieldArray
                    name="sheriffDuties"
                    component={(p) => {
                        const { fields } = p;
                        function handleRemoveSheriffDuty(index: number) {
                            const sdId = fields.get(index).id;
                            if (sdId) {
                                if (onRemoveSheriffDuty) {
                                    onRemoveSheriffDuty(sdId);
                                }
                            }
                            fields.remove(index);
                        }
                        const deleteConfirmMessage = (
                            <p style={{ fontSize: 14 }}>
                                Please confirm that you would like to <b>permanently delete</b> this sheriff duty.
                            </p>
                        );
                        return (
                            <ListGroup >
                                {fields.map((fieldInstanceName, index) => {
                                    return (
                                        <ListGroupItem key={index}>
                                            <div className="pull-right">
                                                <ConfirmationModal
                                                    title="Delete Sheriff Duty"
                                                    message={deleteConfirmMessage}
                                                    actionBtnLabel={<Glyphicon glyph="trash" />}
                                                    actionBtnStyle="danger"
                                                    confirmBtnLabel="Yes"
                                                    confirmBtnStyle="success"
                                                    cancelBtnLabel="No"
                                                    onConfirm={() => {
                                                        handleRemoveSheriffDuty(index);
                                                    }}
                                                />
                                            </div>
                                            <div style={{ marginTop: 20 }}>
                                                <Field
                                                    name={`${fieldInstanceName}.sheriffId`}
                                                    component={SheriffSelector}
                                                    label="Sheriff"
                                                />
                                                <Field
                                                    name={`${fieldInstanceName}.timeRange`}
                                                    component={(p) => <TimeSliderField
                                                        {...p}
                                                        minTime={minTime}
                                                        maxTime={maxTime}
                                                        timeIncrement={15}
                                                        color={'#888'}
                                                    />}
                                                />
                                            </div>
                                        </ListGroupItem>
                                    );
                                }
                                )}
                                <br />
                                <Button
                                    onClick={() => fields.push({
                                        timeRange: {
                                            startTime: minTime,
                                            endTime: maxTime
                                        }
                                    })}
                                >
                                    <Glyphicon glyph="plus" />
                                </Button>
                            </ListGroup>
                        );
                    }}
                />
            );
        });
    }

    render() {
        const {
            handleSubmit,
            assignmentTitle = 'Duty',
            minTime = TimeUtils.getDefaultTimePickerMinTime().toISOString(),
            maxTime = TimeUtils.getDefaultTimePickerMaxTime().toISOString(),
            workSectionId = 'OTHER',
            isNewDuty = false
        } = this.props;
        const SheriffDutyFields = this.renderSheriffDutyFieldsComponent();
        return (
            <div>
                <h1 style={{ marginBottom: 20 }}>{assignmentTitle}</h1>
                <FormWrapper {...this.props}>
                    <Form onSubmit={handleSubmit}>
                        <Field
                            name="timeRange"
                            component={(p) => <TimeSliderField
                                {...p}
                                minTime={minTime}
                                maxTime={maxTime}
                                timeIncrement={15}
                                color={getWorkSectionColour(workSectionId)}
                                label={<h2 style={{ marginBottom: 5 }}>Duty Time Range</h2>}
                            />}
                        />
                        <br />
                        {!isNewDuty && <Field
                            name="comments"
                            component={TextArea}
                            label="Comments"
                        />}
                        <div style={{ marginTop: 40 }}>
                            <h2>Sheriffs for Duty</h2>
                            <SheriffDutyFields />
                        </div>
                    </Form>
                </FormWrapper>
            </div>
        );
    }
}