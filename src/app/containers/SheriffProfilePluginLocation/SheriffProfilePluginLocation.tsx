import React from 'react';
import { IdType, SheriffLocation } from '../../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../../components/SheriffProfile/SheriffProfilePlugin';
import {
    Alert
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';
import { Dispatch } from 'redux';
import { getSheriffLocations, createOrUpdateSheriffLocations } from '../../modules/sheriffLocations/actions';
import { RootState } from '../../store';
import { getSheriffLocationsSel } from '../../modules/sheriffLocations/selectors';
import LocationsDisplay from '../../components/SheriffLocationsDisplay';
import * as Validators from '../../infrastructure/Validators';
import LocationFieldTable from './LocationFieldTable';
import { toTimeString } from 'jag-shuber-api';

export interface SheriffProfilePluginLocationProps {
    locations: SheriffLocation[];
}

export default class SheriffProfilePluginLocation extends SheriffProfileSectionPlugin<SheriffProfilePluginLocationProps> {
    name = 'locations';
    formFieldNames = {
        locations: 'locations.locations'
    };
    title: string = 'Locations';
    FormComponent = (props: SheriffProfilePluginProps<SheriffProfilePluginLocationProps>) => (
        <div>
            <LocationFieldTable
                fieldName={this.formFieldNames.locations}
                title={<h3>Locations</h3>}
                columns={[
                    LocationFieldTable.DateColumn('Start Date', 'startDate'),
                    LocationFieldTable.DateColumn('End Date', 'endDate'),
                    LocationFieldTable.CancelColumn
                ]}
            />
        </div>
    )
    DisplayComponent = (
        { data = { locations: [] } }: SheriffProfilePluginProps<SheriffProfilePluginLocationProps>) => (

            data && (data.locations.length > 0 )
                ? <LocationsDisplay locations={data.locations} />
                : <Alert> No Locations </Alert>
        )

    validate(values: SheriffProfilePluginLocationProps = { locations: [] }): FormErrors | undefined {
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
        return {
            locations: getSheriffLocationsSel(sheriffId)(state),
        };
    }

    getDataFromFormValues(formValues: any): SheriffProfilePluginLocationProps {
        return super.getDataFromFormValues(formValues) || {
            locations: []
        };
    }

    async onSubmit(sheriffId: IdType, formValues: any, dispatch: Dispatch<any>): Promise<SheriffLocation[]> {
        const data = this.getDataFromFormValues(formValues);
        const locations = data.locations.map(pl => ({ ...pl, sheriffId }));
        const allLocations = locations.map(l => ({
            ...l,
            startTime: toTimeString(l.startTime),
            endTime: toTimeString(l.endTime)
        }));
        return allLocations.length > 0 ? await dispatch(createOrUpdateSheriffLocations(allLocations, { toasts: {} })) : [];
    }
}