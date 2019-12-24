import * as React from 'react';
import { IdType } from '../../api';
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { deletedDiff, detailedDiff } from 'deep-object-diff';

export interface FormContainerProps<T = any> {
    objectId?: IdType;
    data?: T;
}
export interface FormContainer<T = any> {
    /**
     * A unique plugin name, no spaces please eg. /[A-Za-z0-9_-]+/
     * @type {string}
     * @memberof Form
     */
    name: string;
    /**
     * The form key, used by redux-form, to bind the form instance to redux data slices
     * @type {string}
     * @memberof Form
     */
    reduxFormKey: string;
    renderDisplay(props: FormContainerProps<T>): React.ReactNode;
    renderFormFields(props: FormContainerProps<T>): React.ReactNode;
    hasErrors(errors: any): boolean;
    // onSubmit(objectId: IdType | undefined, formValues: any, dispatch: Dispatch<any>): Promise<any | void>;
    onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any | void>;
    fetchData(dispatch: Dispatch<any>, filters: {} | undefined): void;
    getData(state: RootState, filters?: {} | undefined): T | undefined;
    validate(values: T): FormErrors<T> | undefined;
}

export abstract class FormContainerBase<T = any> implements FormContainer<T> {
    /**
     * A unique plugin name, no spaces please eg. /[A-Za-z0-9_-]+/
     * @type {string}
     * @memberof Form
     */
    abstract name: string;
    /**
     * The form key, used by redux-form, to bind the form instance to redux data slices
     * @type {string}
     * @memberof Form
     */
    abstract reduxFormKey: string;

    abstract get title(): string;

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
     * @memberof FormContainerBase
     */
    abstract formFieldNames: { [key: string]: string };

    protected get filterFieldNames() {
        const fieldNames = {};

        Object.keys(this.formFieldNames)
            .map(key => fieldNames[key] = `${this.formFieldNames[key]}_filters`);

        return fieldNames as { [key: string]: string };
    }

    DisplayComponent?: React.ReactType<FormContainerProps<T>>;
    FormComponent?: React.ReactType<FormContainerProps<T>>;

    protected getDataFromFormValues(formValues: any, initialValues?: any) {
        if (!initialValues) return formValues[this.reduxFormKey];

        const initial = initialValues[this.reduxFormKey];
        const values = formValues[this.reduxFormKey];

        const data: any = {};

        const formKeys = Object.keys(this.formFieldNames);
        // detailedDiff will return a diff object with added, deleted, and updated keys
        // https://www.npmjs.com/package/deep-object-diff
        const diffKeys = ['added', 'deleted', 'updated'];
        formKeys.forEach(key => {
            let isDirty = false;
            const diff = detailedDiff(initial[key], values[key]);
            diffKeys.forEach(diffKey => {
                if (Object.keys(diff[diffKey]).length > 0) isDirty = true;
            });

            if (isDirty) data[key] = values[key];
        });

        return data;
    }

    protected mapDeletesFromFormValues(map: {}) {
        return {};
    }

    protected getDataToDeleteFromFormValues(formValues: any, initialValues?: any) {
        if (!initialValues) return formValues[this.reduxFormKey];

        const initial = initialValues[this.reduxFormKey];
        const values = formValues[this.reduxFormKey];

        let map: any = {};

        // TODO: Use value, instead of key - redux-form is bound using the value
        // We can check the path using containsPropertyPath which is on this class
        const formKeys = Object.keys(this.formFieldNames);
        formKeys.forEach(key => {
            let isDirty = false;
            const diff = deletedDiff(initial[key], values[key]);
            if (Object.keys(diff).length > 0) isDirty = true;

            if (isDirty) map[key] = { initialValues: initial[key], values: values[key] };
        });

        return this.mapDeletesFromFormValues(map);
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

    renderDisplay(props: FormContainerProps<T>): React.ReactNode {
        const { DisplayComponent } = this;
        return (
            DisplayComponent
                ? <DisplayComponent key={this.name} {...props} />
                : (
                    <div>
                        FormContainer: DisplayComponent not set
                    </div>
                )
        );
    }

    renderFormFields(props: FormContainerProps<T>): React.ReactNode {
        const { FormComponent } = this;
        return (
            FormComponent && <FormComponent key={this.name} {...props} />
        );
    }

    // async onSubmit(objectId: IdType | undefined, formValues: any, dispatch: Dispatch<any>): Promise<any | void> {
    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any | void> {
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

    fetchData(dispatch: Dispatch<any>, filters: {} | undefined) {
        // does nothing
    }

    getData(state: RootState, filters?: {} | undefined): T | undefined {
        // Does nothing
        return undefined;
    }

    validate(values: T): FormErrors<T> | undefined {
        return undefined;
    }
}

export abstract class FormContainerSectionPlugin<T = any> extends FormContainerBase<T> {
    abstract get title(): string;
}
