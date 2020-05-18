import * as React from 'react';
import { IdType } from '../../api/Api';
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { deletedDiff, detailedDiff } from 'deep-object-diff';

export interface SheriffProfilePluginProps<T = any> {
    sheriffId?: IdType;
    data?: T;
    pluginAuth?: any;
    pluginPermissions?: any;
    getPluginPermissions?: Function;
}

type AuthPermissions = string[];
type PluginPermissions = { [key: string]: string[] };

export interface SheriffProfilePlugin<T = any> {
    /**
     * This property is used for namespacing the form data,
     * validation and maintaining state of sheriff profile
     * with respects to plugins
     * @type {string}
     * @memberof AdminFormPlugin
     */
    name: string;
    /**
     * The form key, used by redux-form, to bind the form instance to redux data slices
     * @type {string}
     * @memberof Form
     */
    reduxFormKey: string;
    useAuth?: boolean;
    pluginPermissions: any; // TODO: We can type this better
    renderDisplay(props: SheriffProfilePluginProps<T>): React.ReactNode;
    renderFormFields(props: SheriffProfilePluginProps<T>): React.ReactNode;
    hasErrors(errors: any): boolean;
    onSubmit(sheriffId: IdType | undefined, formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any | void>;
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
     * @memberof AdminFormPlugin
     */
    abstract name: string;
    /**
     * The form key, used by redux-form, to bind the form instance to redux data slices
     * @type {string}
     * @memberof Form
     */
    abstract reduxFormKey: string;

    public useAuth?: boolean;

    protected _pluginPermissions?: string[];

    public get pluginPermissions(): string[] | undefined {
        return this._pluginPermissions;
    }

    public set pluginPermissions(config: string[] | undefined) {
        this._pluginPermissions = config;
    }

    protected _pluginAuth?: AuthPermissions;

    public get pluginAuth(): AuthPermissions | undefined {
        return this._pluginAuth;
    }

    public set pluginAuth(config: AuthPermissions | undefined) {
        this._pluginAuth = config;
    }

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

    protected getPluginPermissions(): string[] {
        return this.pluginPermissions || [];
    }

    protected getDataFromFormValues(formValues: any, initialValues?: any) {
        if (!initialValues) return formValues[this.reduxFormKey] as T;

        const initial = initialValues[this.reduxFormKey];
        const values = formValues[this.reduxFormKey];

        const data: any = {};

        const formKeys = Object.keys(this.formFieldNames);
        // detailedDiff will return a diff object with added, deleted, and updated keys
        // https://www.npmjs.com/package/deep-object-diff
        const diffKeys = ['added', 'updated'];
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

    protected mapExpiredFromFormValues(map: {}, isExpired?: boolean) {
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

    // TODO: Use a const or something to set the expired key, or make it configurable
    protected getDataToExpireFromFormValues(formValues: any, initialValues?: any, isExpired?: boolean) {
        isExpired = isExpired || false;
        if (!initialValues) return formValues[this.reduxFormKey];

        const initial = initialValues[this.reduxFormKey];
        const values = formValues[this.reduxFormKey];

        let map: any = {};

        // TODO: Use value, instead of key - redux-form is bound using the value
        // We can check the path using containsPropertyPath which is on this class
        const formKeys = Object.keys(this.formFieldNames);
        // detailedDiff will return a diff object with added, deleted, and updated keys
        // https://www.npmjs.com/package/deep-object-diff
        const diffKeys = ['updated'];
        formKeys.forEach(key => {
            let isDirty = false;
            const diff = detailedDiff(initial[key], values[key]);
            diffKeys.forEach(diffKey => {
                if (Object.keys(diff[diffKey]).length > 0) isDirty = true;
            });

            if (isDirty) map[key] = { initialValues: initial[key], values: values[key] };
        });

        return this.mapExpiredFromFormValues(map, isExpired);
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

        // If we're dealing with a plugin that has nested redux forms,
        // we need to make an extra check to handle FormArrays
        if (containsPath && Array.isArray(propertyError)) {
            // Filter out any undefined values they are just in the error array to maintain the row index
            containsPath = propertyError.filter(error => error).length > 0;
        }

        // We've traversed the whole property string finding each piece, there is an error
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
        const getPluginPermissions = this.getPluginPermissions.bind(this);
        return (
            FormComponent && <FormComponent key={this.name} {...props} getPluginPermissions={getPluginPermissions} />
        );
    }

    async onSubmit(
        sheriffid: IdType | undefined,
        formValues: any,
        initialValues: any,
        dispatch: Dispatch<any>
    ): Promise<any | void> {
        // does nothing
    }

    hasErrors(errors: any) {
        // Traverse first nodes of error object checking for errors on each
        return Object.keys(errors).some(eKey => (
            Object.keys(this.formFieldNames).some(key => {
                const formErrors = errors[eKey];
                const formPath = this.formFieldNames[key];
                return this.containsPropertyPath(formErrors, formPath);
            })
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
