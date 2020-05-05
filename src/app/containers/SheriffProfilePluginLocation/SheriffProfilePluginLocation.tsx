import React from 'react';
import { DateType, IdType, SheriffLocation } from '../../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../../components/SheriffProfile/SheriffProfilePlugin';
import {
    Alert, Col, Row, Table
} from 'react-bootstrap';
import {
    Field,
    FormErrors
} from 'redux-form';
import { Dispatch } from 'redux';
import {
    getSheriffLocations,
    createOrUpdateSheriffLocations,
    deleteSheriffLocations
} from '../../modules/sheriffLocations/actions';

import { RootState } from '../../store';
import { getSheriffFullDayLocations, getSheriffPartialDayLocations } from '../../modules/sheriffLocations/selectors';
import LocationsDisplay from '../../components/SheriffLocationsDisplay';
import * as Validators from '../../infrastructure/Validators';
import LocationFieldTable from './LocationFieldTable';
import { toTimeString } from 'jag-shuber-api';
import LocationDisplay from '../LocationDisplay';
import SheriffDisplay from '../SheriffDisplay';
import SelectorField from '../../components/FormElements/SelectorField';
import LocationSelector from '../LocationSelector';

export interface SheriffProfilePluginLocationProps {
    locations: SheriffLocation[];
    fullDayLocations: SheriffLocation[],
    partialDayLocations: SheriffLocation[]
}

export default class SheriffProfilePluginLocation
    extends SheriffProfileSectionPlugin<SheriffProfilePluginLocationProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'SHERIFF_PROFILE_LOCATION';
    // END NOTICE
    reduxFormKey = 'sheriffLocations';
    formFieldNames = {
        currentLocation: 'sheriff.currentLocationId',
        homeLocation: 'sheriff.homeLocationId',
        locations: 'locations',
        fullDayLocations: 'sheriffLocations.fullDayLocations',
        partialDayLocations: 'sheriffLocations.partialDayLocations'

    };
    title: string = 'Locations';
    FormComponent = (props: SheriffProfilePluginProps<SheriffProfilePluginLocationProps>) => (
        <div>
            <h3>Home Location</h3>
            <fieldset className="with-border" style={{ background: '#fefefe', padding: 0 }}>
                <Row>
                    <Col xs={12} style={{ marginTop: '10px', marginBottom: '15px' }}>
                        <div className="flex-row-wrap">
                            <Field
                                name={this.formFieldNames.homeLocation}
                                component={
                                    (p) => <SelectorField
                                        {...p}
                                        SelectorComponent={
                                            (sp) => <LocationSelector label="Home Location" {...sp} />}
                                    /> }
                                label="Choose a Location"
                                validate={[Validators.required]}
                            />
                            {/* <Field
                                name={this.formFieldNames.currentLocation}
                                component={
                                    (p) => <SelectorField
                                        {...p}
                                        SelectorComponent={
                                            (sp) => <LocationSelector label="Current Location" {...sp} />}
                                    /> }
                                label="Current Location"
                            /> */}
                        </div>
                    </Col>
                </Row>
            </fieldset>
            <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                <LocationFieldTable
                    fieldName={this.formFieldNames.fullDayLocations}
                    title={<h3>Full Day</h3>}
                    columns={[
                        LocationFieldTable.LocationColumn(),
                        LocationFieldTable.DateColumn('Start Date', 'startDate'),
                        LocationFieldTable.DateColumn('End Date', 'endDate'),
                        LocationFieldTable.CancelColumn
                    ]}
                />

                <LocationFieldTable
                    fieldName={this.formFieldNames.partialDayLocations}
                    title={<h3>Partial Day</h3>}
                    columns={[
                        LocationFieldTable.LocationColumn(),
                        LocationFieldTable.DateColumn('Start Date', 'startDate'),
                        LocationFieldTable.DateColumn('End Date', 'endDate'),
                        LocationFieldTable.CancelColumn
                    ]}
                />
            </div>
        </div>
    )
    DisplayComponent = (
        {
            sheriffId,
            data = {
                locations: [],
                fullDayLocations: [],
                partialDayLocations: []
            }
        }: SheriffProfilePluginProps<SheriffProfilePluginLocationProps>
    ) => {
        return (
            <>
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
                {data && data.locations.length > 0 && (
                    <LocationsDisplay locations={data.locations}/>
                )}
                {!data || data.locations.length > 0 && (
                    <Alert> No Locations </Alert>
                )}
            </>
        );
    }

    validate(values: SheriffProfilePluginLocationProps = {
        locations: [],
        fullDayLocations: [],
        partialDayLocations: []
    }): FormErrors | undefined {
        let locationErrors: any = [];

        if (values.locations) {
            locationErrors = values.locations.map(l => (
                {
                    startDate: Validators.validateWith(
                        Validators.required,
                        Validators.isSameOrBefore(l.endDate, 'End Date')
                    )(l.startDate),
                    endDate: Validators.validateWith(
                        Validators.required,
                        Validators.isSameOrAfter(l.startDate, 'Start Date')
                    )(l.endDate)
                }
            ));
        }

        const errors = { locations: locationErrors };

        return (errors.locations.length > 0 ) ? errors : undefined;
    }

    fetchData(sheriffId: IdType, dispatch: Dispatch<any>) {
        dispatch(getSheriffLocations());
    }

    getData(sheriffId: IdType, state: RootState) {
        const sheriffFullDayLocations = getSheriffFullDayLocations(sheriffId)(state);
        const sheriffPartialDayLocations = getSheriffPartialDayLocations(sheriffId)(state);
        return {
            locations: [...sheriffFullDayLocations, ...sheriffPartialDayLocations],
            fullDayLocations: sheriffFullDayLocations,
            partialDayLocations: sheriffPartialDayLocations
            // fullDayLocations: sheriffFullDayLocations,
            // partialDayLocations: sheriffPartialDayLocations
        };
    }

    getDataFromFormValues(formValues: any): SheriffProfilePluginLocationProps {
        return super.getDataFromFormValues(formValues) || {
            // locations: [],
            fullDayLocations: [],
            partialDayLocations: []
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedFullDayLocationIds: IdType[] = [];

        if (map.fullDayLocations) {
            const fullDayInitialValues = map.fullDayLocations.initialValues;
            const fullDayExistingIds = map.fullDayLocations.values.map((val: any) => val.id);

            const removeFullDayLocationIds = fullDayInitialValues
                .filter((val: any) => (fullDayExistingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedFullDayLocationIds.push(...removeFullDayLocationIds);
        }

        const deletedPartialDayLocationIds: IdType[] = [];

        if (map.partialDayLocations) {
            const partialDayInitialValues = map.partialDayLocations.initialValues;
            const partialDayExistingIds = map.partialDayLocations.values.map((val: any) => val.id);

            const removePartialDayLocationIds = partialDayInitialValues
                .filter((val: any) => (partialDayExistingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedPartialDayLocationIds.push(...removePartialDayLocationIds);
        }

        return {
            fullDayLocations: deletedFullDayLocationIds,
            partialDayLocations: deletedPartialDayLocationIds
        };
    }

    async onSubmit(sheriffId: IdType, formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any> {
        const data = this.getDataFromFormValues(formValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedFullDaySheriffLocations: IdType[] = dataToDelete.fullDayLocations as IdType[];
        const deletedPartialDaySheriffLocations: IdType[] = dataToDelete.partialDayLocations as IdType[];
        const deletedSheriffLocations: IdType[] = [
            ...deletedFullDaySheriffLocations, ...deletedPartialDaySheriffLocations
        ];

        const fullDayLocations = data.fullDayLocations.map(l => ({ ...l, sheriffId, isPartial: 0 }));
        const partialDayLocations = data.partialDayLocations.map(l => ({ ...l, sheriffId, isPartial: 1 }));

        let allLocations = [...fullDayLocations, ...partialDayLocations] as SheriffLocation[];

        allLocations = allLocations.map(l => ({
            ...l as SheriffLocation,
            // startTime: toTimeString(l.startTime),
            // endTime: toTimeString(l.endTime),
            startDate: (l.startDate) ? l.startDate : new Date().toISOString(),
            endDate: (l.endDate) ? l.endDate : new Date().toISOString()
        }));

        if (deletedSheriffLocations.length > 0) {
            await dispatch(deleteSheriffLocations(deletedSheriffLocations));
        }

        if (allLocations.length > 0) {
            await dispatch(createOrUpdateSheriffLocations(allLocations, { toasts: {} }));
        }
    }
}
