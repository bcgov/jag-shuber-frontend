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
import LocationSelector from './LocationSelector';
import LocationDisplay from './LocationDisplay';
import SelectorField from '../components/FormElements/SelectorField';

export default class SheriffProfilePluginLocation extends SheriffProfileSectionPlugin<Sheriff> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'SHERIFF_PROFILE_LOCATION';
    // END NOTICE
    reduxFormKey = 'location';
    formFieldNames = {
        currentLocation: 'sheriff.currentLocationId',
        homeLocation: 'sheriff.homeLocationId'
    };

    title: string = 'Location';

    DisplayComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                homeLocationId = '',
                currentLocationId = ''
            } = {} }) =>
                (
                    <Table responsive={true} >
                        <tbody>
                            <tr>
                                <td><strong>Home Location</strong></td>
                                <td><LocationDisplay id={homeLocationId} /></td>
                            </tr>
                            <tr>
                                <td><strong>Current Location</strong></td>
                                <td><LocationDisplay id={currentLocationId} /></td>
                            </tr>
                        </tbody>
                    </Table>
                )
            }
        />
    )

    FormComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <div className="flex-row-wrap">
            <Field
                name={this.formFieldNames.homeLocation}
                component={
                    (p) => <SelectorField
                        {...p}
                        SelectorComponent={
                            (sp) => <LocationSelector label="Home Location" {...sp} />}
                    /> }
                label="Home Location"
                validate={[Validators.required]}
            />
            <Field
                name={this.formFieldNames.currentLocation}
                component={
                    (p) => <SelectorField
                        {...p}
                        SelectorComponent={
                            (sp) => <LocationSelector label="Current Location" {...sp} />}
                    /> }
                label="Current Location"
            />
        </div>
    )
}
