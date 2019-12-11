import React from 'react';
import {
    Alert, Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import { RootState } from '../../store';
import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
    // FormContainerSectionPlugin
} from '../../components/Form/FormContainer';

import CodeTypesFieldTable from './CodeTypesFieldTable';

// import { fromTimeString } from 'jag-shuber-api';

export interface AdminCodeTypesProps extends FormContainerProps {}

export interface AdminCodeTypesDisplayProps extends FormContainerProps {

}

class AdminCodeTypesDisplay extends React.PureComponent<AdminCodeTypesDisplayProps, any> {
    render() {
        // const { data = [] } = this.props;

        // TODO: Rip out dummy data
        const testData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
        return (
            <div>
                {/*<h3>Code Types</h3>*/}
                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Display Name</th>
                            <th className="text-left">Code</th>
                            <th className="text-left">Description</th>
                            <th className="text-left">Start Date</th>
                            <th className="text-left">End Date</th>
                            <th className="text-left">Status</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {testData.map(r => {
                            return (
                                <tr key={r.id}>
                                    <td>Random Code Type</td>
                                    <td>RNDM_CODE</td>
                                    <td>Ipsum Lorem Dolor</td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>
                                        Active
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default class AdminCodeTypesGrid extends FormContainerBase<AdminCodeTypesProps> {
    name = 'admin-code-types-grid';
    reduxFormKey = 'codeTypes';
    formFieldNames = { default: 'codeTypes'};
    title: string = 'Manage Code Types';
    FormComponent = (props: FormContainerProps<AdminCodeTypesProps>) => (
        <div>
            <CodeTypesFieldTable
                fieldName={this.formFieldNames.default}
                title={<h3>Code Types</h3>}
                columns={[
                    CodeTypesFieldTable.RoleCodeColumn(),
                    CodeTypesFieldTable.DateColumn('Start Date', 'startDate'),
                    CodeTypesFieldTable.DateColumn('End Date', 'endDate'),
                    CodeTypesFieldTable.CancelColumn()
                ]}
            />
        </div>
    )

    // TODO: Figure out why Fragments aren't working...
    DisplayComponent = (props: FormContainerProps<AdminCodeTypesDisplayProps>) => (
        <div>
            <Alert>No code types exist</Alert>
            <AdminCodeTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminCodeTypesProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Not sure if this should be codeTypeId or what, I'm not there yet...
    fetchData(codeTypeId: IdType, dispatch: Dispatch<{}>) {
        // TODO: Implement getCodeTypes
        // dispatch(getCodeTypes());
    }

    getData(codeTypeId: IdType, state: RootState) {
        return {
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
