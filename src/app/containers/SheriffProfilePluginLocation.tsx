import React from 'react';
import { Sheriff } from '../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../components/SheriffProfile/SheriffProfilePlugin';
import SheriffDisplay from './SheriffDisplay';
import { Table } from 'react-bootstrap';
import { Field } from 'redux-form';
import * as Validators from '../infrastructure/Validators';
import CourthouseSelector from './CourthouseSelector';
import CourthouseDisplay from './CourthouseDisplay';

export default class SheriffProfilePluginLocation extends SheriffProfileSectionPlugin<Sheriff> {

    title: string = 'Location';
    DisplayComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                homeCourthouseId = '',
                currentCourthouseId = ''
            } = {} }) =>
                (
                    <Table responsive={true} >
                        <tbody>
                            <tr>
                                <td><strong>Home Location</strong></td>
                                <td><CourthouseDisplay id={homeCourthouseId} /></td>
                            </tr>
                            <tr>
                                <td><strong>Current Location</strong></td>
                                <td><CourthouseDisplay id={currentCourthouseId} /></td>
                            </tr>
                        </tbody>
                    </Table>
                )
            }
        />
    )

    FormComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <div>
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
                // validate={[Validators.required]}
            />
        </div>
    )
}