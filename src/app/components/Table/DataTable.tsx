import * as React from 'react';
import { IdType } from '../../api';
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';

export interface DataTableProps<T = any> {
    objectId?: IdType;
    data?: T;
}
export interface DataTable<T = any> {
    /**
     * This property is used for namespacing the form data,
     * validation and maintaining state of sheriff profile
     * with respects to plugins
     * @type {string}
     * @memberof Table
     */
    name: string;
    renderDisplay(props: DataTableProps<T>): React.ReactNode;
    renderFormFields(props: DataTableProps<T>): React.ReactNode;
    hasErrors(errors: any): boolean;
    onSubmit(objectId: IdType | undefined, formValues: any, dispatch: Dispatch<any>): Promise<any | void>;
    fetchData(objectId: IdType | undefined, dispatch: Dispatch<any>): void;
    getData(objectId: IdType | undefined, state: RootState): T | undefined;
    validate(values: T): FormErrors<T> | undefined;
}

export abstract class DataTableBase<T = any> implements DataTable<T> {
    /**
     * This property is used for namespacing the form data,
     * validation and maintaining state of sheriff profile
     * with respects to plugins
     * @type {string}
     * @memberof Table
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
     * @memberof DataTableBase
     */
    abstract formFieldNames: { [key: string]: string };
    DisplayComponent?: React.ReactType<DataTableProps<T>>;
    FormComponent?: React.ReactType<DataTableProps<T>>;

    protected getDataFromFormValues(formValues: any): T {
        return formValues[this.name] as T;
    }

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

    renderDisplay(props: DataTableProps<T>): React.ReactNode {
        const { DisplayComponent } = this;
        return (
            DisplayComponent
                ? <DisplayComponent key={this.name} {...props} />
                : (
                    <div>
                        DataTable: DisplayComponent not set
                    </div>
                )
        );
    }

    renderFormFields(props: DataTableProps<T>): React.ReactNode {
        const { FormComponent } = this;
        return (
            FormComponent && <FormComponent key={this.name} {...props} />
        );
    }

    async onSubmit(objectId: IdType | undefined, formValues: any, dispatch: Dispatch<any>): Promise<any | void> {
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

    fetchData(objectId: IdType | undefined, dispatch: Dispatch<any>) {
        // does nothing
    }

    getData(objectId: IdType | undefined, state: RootState): T | undefined {
        // Does nothing
        return undefined;
    }

    validate(values: T): FormErrors<T> | undefined {
        return undefined;
    }
}

export abstract class DataTableSectionPlugin<T = any> extends DataTableBase<T> {
    abstract get title(): string;
}
