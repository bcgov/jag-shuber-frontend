import React from 'react';
import {
    Form,
    Table,
    Button,
    Glyphicon
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps,
    FieldArray
} from 'redux-form';
import TextField from './../FormElements/TextField';
import * as Validators from '../../infrastructure/Validators';
import CourthouseSelector from '../../containers/CourthouseSelector';
import {
    SheriffProfile,
    IdType,
    Leave,
    DateType
} from '../../api/Api';
import SheriffRankSelector from '../../containers/CourthouseSheriffRankCodeSelector';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import DateField from '../FormElements/DateField/DateField';
import LeaveTypeSelector from '../../containers/LeaveTypeSelector';

interface RecurrenceProps {
    id?: IdType;
    startDate: DateType;
    endDate: DateType;
    leaveTypeCode: string;
}
class RecurrenceFieldArray extends FieldArray<RecurrenceProps | Partial<Leave>> {
}
export interface SheriffProfileFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
}

export default class SheriffProfileForm extends
    React.PureComponent<SheriffProfileFormProps & InjectedFormProps<{}, SheriffProfileFormProps>, {}> {

    static parseSheriffFromValues(values: any): SheriffProfile {
        return { ...values } as SheriffProfile;
    }

    static sheriffToFormValues(sheriffProfile: SheriffProfile): any {
        return { ...sheriffProfile };
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit} >
                    <CollapsibleSection sectionTitle="Identification">
                        <Field
                            name="sheriff.firstName"
                            component={TextField as any}
                            label="First Name"
                            validate={[Validators.required]}
                        />
                        <Field
                            name="sheriff.lastName"
                            component={TextField as any}
                            label="Last Name"
                            validate={[Validators.required]}
                        />
                        <Field
                            name="sheriff.rankCode"
                            component={SheriffRankSelector as any}
                            label="Rank"
                            validate={[Validators.required]}
                        />
                        <Field
                            name="sheriff.badgeNo"
                            component={TextField as any}
                            label="Badge Number"
                            validate={[Validators.required]}
                        />
                        <Field
                            name="sheriff.alias"
                            component={TextField as any}
                            label="Alias"
                        />
                    </CollapsibleSection>

                    <CollapsibleSection sectionTitle="Location">
                        <Field
                            name="sheriff.homeCourthouseId"
                            component={CourthouseSelector as any}
                            label="Home Location"
                            validate={[Validators.required]}
                        />
                        <Field
                            name="sheriff.currentCourthouseId"
                            component={CourthouseSelector as any}
                            label="Current Location"
                            validate={[Validators.required]}
                        />
                    </CollapsibleSection>

                    <CollapsibleSection sectionTitle="Leave" isInitiallyCollapsed={false}>
                        <RecurrenceFieldArray
                            name="leaves"
                            component={(p) => {
                                const { fields } = p;
                                return (
                                    <Table striped={true} >
                                        <thead>
                                            <tr>
                                                <th className="text-left">Start Date</th>
                                                <th className="text-left">End Date</th>
                                                <th className="text-left">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields.map((fieldInstanceName, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <Field
                                                                name={`${fieldInstanceName}.startDate`}
                                                                component={DateField as any}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Field
                                                                name={`${fieldInstanceName}.endDate`}
                                                                component={DateField as any}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Field
                                                                name={`${fieldInstanceName}.trainingTypeCode`}
                                                                component={LeaveTypeSelector as any}
                                                                label="Type Code"
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <br />
                                            <Button
                                                onClick={() => fields.push({})}
                                            >
                                                <Glyphicon glyph="plus" />
                                            </Button>
                                        </tbody>
                                    </Table>
                                );
                            }}
                        />
                    </CollapsibleSection>
                </Form>
            </div>
        );
    }
}
