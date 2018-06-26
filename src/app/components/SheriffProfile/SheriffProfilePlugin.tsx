import * as React from 'react';
import { IdType } from '../../api/Api';
import { RootState } from '../../store';
import { Dispatch } from 'redux';

export interface SheriffProfilePluginProps {
    sheriffId: IdType;
}

export interface SheriffProfilePlugin<T> {
    name: string;
    renderDisplay(props: SheriffProfilePluginProps & T): React.ReactNode;
    renderFormFields(props: SheriffProfilePluginProps & T): React.ReactNode;
    hasErrors(errors: any): boolean;
    onSubmit(sheriffid: IdType, formValues: any, dispatch: Dispatch<any>): Promise<T | void>;
    fetchData(sheriffId: IdType, dispatch: Dispatch<any>): void;
    getData(sheriffId: IdType, state: RootState): T | undefined;
}

export abstract class SheriffProfilePluginBase<T> implements SheriffProfilePlugin<T> {
    abstract name: string;

    abstract formFieldNames: { [key: string]: string };
    DisplayComponent?: React.ReactType<SheriffProfilePluginProps & T>;
    FormComponent?: React.ReactType<SheriffProfilePluginProps & T>;

    containsPropertyPath(errors: Object = {}, propertyPath: string = '') {
        const propertyNames = propertyPath.split('.');
        let propertyError = errors;
        if (propertyNames.length === 0) {
            return false;
        }
        // Assume there is an error until proven innocent
        let containsPath = true;
        for (let i = 0; i < propertyNames.length; i++) {
            const propertyName = propertyNames[i];
            if (!propertyError.hasOwnProperty(propertyName)) {
                containsPath = false;
                break;
            }
            propertyError = propertyError[propertyName];
        }
        // we've traversed the whole property string finding each piece, there is an error
        return containsPath;
    }
    renderDisplay(props: SheriffProfilePluginProps & T): React.ReactNode {
        const { DisplayComponent } = this;
        return (
            DisplayComponent
                ? <DisplayComponent {...props} />
                : (
                    <div>
                        Sheriff Profile Plugin: DisplayComponent not set
                    </div>
                )
        );
    }
    renderFormFields(props: SheriffProfilePluginProps & T): React.ReactNode {
        const { FormComponent } = this;
        return (
            FormComponent && <FormComponent {...props} />
        );
    }

    async onSubmit(sheriffid: IdType, formValues: any, dispatch: Dispatch<any>): Promise<T | void> {
        // does nothing
    }

    hasErrors(errors: any) {
        // Traverse first nodes of error object checking for errors on each
        return Object.keys(errors).some(eKey => (
            Object.keys(this.formFieldNames).some(key => (
                this.containsPropertyPath(errors[eKey], this.formFieldNames[key])
            ))
        ));
    }

    fetchData(sheriffId: IdType, dispatch: Dispatch<any>) {
        // does nothing
    }

    getData(sheriffId: IdType, state: RootState): T | undefined {
        // Does nothing
        return undefined;
    }
}

export abstract class SheriffProfileSectionPlugin<T> extends SheriffProfilePluginBase<T>{
    abstract get title(): string;
}