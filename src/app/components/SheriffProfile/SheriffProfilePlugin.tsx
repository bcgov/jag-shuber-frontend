import * as React from 'react';
import { IdType } from '../../api/Api';
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';

export interface SheriffProfilePluginProps<T = any> {
    sheriffId?: IdType;
    data?: T;
}
export interface SheriffProfilePlugin<T = any> {
    /**
     * This property is used for namespacing the form data,
     * validation and maintaining state of sheriff profile
     * with respects to plugins
     * @type {string}
     * @memberof SheriffProfilePlugin
     */
    name: string;
    renderDisplay(props: SheriffProfilePluginProps<T>): React.ReactNode;
    renderFormFields(props: SheriffProfilePluginProps<T>): React.ReactNode;
    hasErrors(errors: any): boolean;
    onSubmit(sheriffid: IdType | undefined, formValues: any, dispatch: Dispatch<any>): Promise<T | void>;
    fetchData(sheriffId: IdType | undefined, dispatch: Dispatch<any>): void;
    getData(sheriffId: IdType | undefined, state: RootState): T | undefined;
    validate(values: T): FormErrors<T> | undefined;
}

export abstract class SheriffProfilePluginBase<T = any> implements SheriffProfilePlugin<T> {
    /**
     * This property is used for namespacing the form data,
     * validation and maintaining state of sheriff profile 
     * with respects to plugins
     * @type {string}
     * @memberof SheriffProfilePlugin
     */
    abstract name: string;

    /**
     * The formFieldNames are used to enhance to experience
     * when submitting / saving the profile.  These fields 
     * should be the names of fields used by this plugin
     * to allow automatic determination of errors that 
     * exist within specific plugins (i.e. to highlight tabs 
     * with errors etc.)
     *
     * @abstract
     * @type {{ [key: string]: string }}
     * @memberof SheriffProfilePluginBase
     */
    abstract formFieldNames: { [key: string]: string };
    DisplayComponent?: React.ReactType<SheriffProfilePluginProps<T>>;
    FormComponent?: React.ReactType<SheriffProfilePluginProps<T>>;

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

    renderDisplay(props: SheriffProfilePluginProps<T>): React.ReactNode {
        const { DisplayComponent } = this;
        return (
            DisplayComponent
                ? <DisplayComponent key={this.name} {...props} />
                : (
                    <div>
                        Sheriff Profile Plugin: DisplayComponent not set
                    </div>
                )
        );
    }

    renderFormFields(props: SheriffProfilePluginProps<T>): React.ReactNode {
        const { FormComponent } = this;
        return (
            FormComponent && <FormComponent key={this.name} {...props} />
        );
    }

    async onSubmit(sheriffid: IdType | undefined, formValues: any, dispatch: Dispatch<any>): Promise<T | void> {
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

    fetchData(sheriffId: IdType | undefined, dispatch: Dispatch<any>) {
        // does nothing
    }

    getData(sheriffId: IdType | undefined, state: RootState): T | undefined {
        // Does nothing
        return undefined;
    }

    validate(values: T): FormErrors<T> | undefined {
        return undefined;
    }
}


export abstract class SheriffProfileSectionPlugin<T = any> extends SheriffProfilePluginBase<T> {
    abstract get title(): string;
}