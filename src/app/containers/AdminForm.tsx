import React from 'react';
import {
    reduxForm,
    ConfigProps,
    getFormInitialValues,
    getFormSyncErrors,
    getFormAsyncErrors,
    getFormSubmitErrors,
    hasSubmitFailed,
    InjectedFormProps,
    SubmissionError,
    FormErrors,
    reset
} from 'redux-form';

import { connect, Dispatch } from 'react-redux';

import { Alert } from 'react-bootstrap';

import merge from 'deepmerge';

import { toast } from '../components/ToastManager/ToastManager';
import { RequestActionConfig } from '../infrastructure/Requests/RequestActionBase';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';

// import { currentLocation } from '../../modules/user/selectors';

import { RootState } from '../store';

import {
    currentUserRoleScopes,
    currentLocation as currentLocationSelector,
    isLocationSet as isLocationSetSelector
} from '../modules/user/selectors';

import {
    selectedAdminFormSection
} from '../modules/adminForm/selectors';

// TODO: Replace these too
import {
    getAdminRolesPluginErrors as getAdminFormPluginErrors
} from '../modules/roles/selectors';

import {
    // TODO: We can almost pull these out now...
    selectAdminRolesPluginSection as selectAdminFormSection,
    setAdminRolesPluginSubmitErrors as setAdminFormPluginSubmitErrors,
} from '../modules/roles/actions'; // TODO: This is not generic!

import AdminFormComponent, { AdminFormProps } from '../components/AdminForm/AdminForm';
import { FormContainerBase } from '../components/Form/FormContainer';
import SheriffProfileModal from './SheriffProfileModal';
import { IdType } from '../api';

async function submitPlugins(
    values: any,
    initialValues: any,
    dispatch: Dispatch<any>,
    plugins: FormContainerBase<any>[] = []
) {
    // Try creating resources catching errors so that we can throw a submission error at the end
    const pluginErrors: FormErrors = {};

    await Promise.all(plugins.map(async p => {
        try {
            await p.onSubmit(values, initialValues, dispatch);
        } catch (e) {
            pluginErrors[p.name] = e;
        }
    }));

    const pluginsWithErrors = Object.keys(pluginErrors);
    if (pluginsWithErrors.length > 0) {
        const formErrors: FormErrors = {};
        const pluginErrorMessages: { [key: string]: string } = {};
        pluginsWithErrors.map(pluginName => {
            const err = pluginErrors[pluginName];
            if (err instanceof SubmissionError) {
                const { errors: { _error = undefined, ...restErrors } = {} } = err;
                if (_error) {
                    pluginErrorMessages[pluginName] = _error;
                }
                Object.keys(restErrors).forEach(fieldKey => {
                    formErrors[fieldKey] = restErrors[fieldKey];
                });
            } else {
                console.warn('Caught AdminForm error', err);
            }
        });
        dispatch(setAdminFormPluginSubmitErrors(pluginErrorMessages));
        throw new SubmissionError({ ...formErrors });
    }
}

function collectPluginErrors(state: any, formName: string, plugins: FormContainerBase<any>[] = []) {
    const includeErrors = hasSubmitFailed(formName)(state);
    if (!includeErrors) {
        return {
            pluginsWithErrors: {},
            pluginErrors: {}
        };
    }
    const pluginErrors = includeErrors ? getAdminFormPluginErrors(state) : {};
    const errors = includeErrors ?
        {
            syncErrors: getFormSyncErrors(formName)(state),
            asyncErrors: getFormAsyncErrors(formName)(state),
            submitErrors: getFormSubmitErrors(formName)(state)
        } : {};

    const pluginsWithErrors = plugins.reduce(
        (haveErrors, plugin) => {
            haveErrors[plugin.name] = (pluginErrors as Object).hasOwnProperty(plugin.name) || plugin.hasErrors(errors);
            return haveErrors;
        },
        {}
    );

    return {
        pluginsWithErrors,
        pluginErrors
    };
}

const formConfig: ConfigProps<{}, AdminFormProps> = {
    form: 'AdminForm',
    enableReinitialize: true,
    validate: (values: any, { plugins = [], selectedSection }) => {
        const validationErrors = plugins.reduce((errors, plugin) => {
            const pluginValues = values[plugin.reduxFormKey];
            const pluginErrors = plugin.validate(pluginValues);
            if (pluginErrors) {
                errors[plugin.reduxFormKey] = {...errors[plugin.reduxFormKey], ...pluginErrors};
            }

            return errors;
        }, {} as FormErrors);
        return {...validationErrors};
    },
    onSubmit: async (values: any, dispatch, props: AdminFormProps) => {
        const { plugins = [], initialValues } = props;
        const requestConfig: RequestActionConfig<any> = {
            toasts: {
                error: (e) => `Error occurred while creating/updating: ${e}`
            }
        };
        // TODO: This probably is the annoying success message that doesn't display anything...
        //  Just disable it for now...
        // let actionMessage = '';

        try {
            // Filter out unchanged values so we're not making unnecessary requests
            // https://github.com/redux-form/redux-form/issues/701
            const { selectedSection } = props;

            if (selectedSection) {
                // Not the most elegant way to do things but it's easy, and it works
                // If you decide to override the default renderer and use a custom layout
                // that displays multiple plugins in the same form, you may have to save
                // more than one form... if so, when setting the AdminForm's 'selectedSection'
                // set the value to the name of whatever plugins are used by the currently
                // selected section, separated by a colon (:) delimiter.
                // TODO: Pass this in as a function-type prop? (It's a good idea, and idiomatic!)
                const pluginNames = selectedSection.split(':');
                await Promise.all(pluginNames.map(async pluginName => {
                    return await submitPlugins(values, initialValues, dispatch, plugins.filter(plugin => {
                        return plugin.name === pluginName;
                    }));
                }));
            } else {
                return await submitPlugins(values, initialValues, dispatch, plugins);
            }
        } catch (e) {
            toast.warn('An issue occurred with one of the sections');
            throw e;
        }

        // TODO: This probably is the annoying success message that doesn't display anything...
        //  Just disable it for now...
        // toast.success(`${actionMessage}`);
    }
};

// Wire up the Form to redux Form
// @ts-ignore
const AdminForm = reduxForm<{}, AdminFormProps>(formConfig)(AdminFormComponent);

const AdminFormSubmitButton = (props: Partial<SubmitButtonProps>) => (
    <FormSubmitButton {...props} formName={formConfig.form} />
)

interface LocationProps {
    currentLocation?: string;
    isLocationSet?: boolean;
}

interface AdminFormContainerStateProps extends LocationProps {
    pluginsWithErrors: { [key: string]: boolean };
    pluginErrors: { [key: string]: Error | string };
    selectedSection?: string;
}

interface AdminFormContainerDispatchProps {
    // Just pass the dispatcher down to the plugins
    dispatch: Dispatch<any>;
    initialize: () => void;
    onSelectSection: (sectionName: string) => void;
}

interface AdminFormContainerPluginProps {
    plugins?: any[];
}

type AdminFormContainerProps = AdminFormProps &
    InjectedFormProps<{}, AdminFormProps>
    & AdminFormContainerStateProps
    & AdminFormContainerDispatchProps
    & AdminFormContainerPluginProps;

class AdminFormErrorDisplay extends React.PureComponent<{ pluginErrors: { [key: string]: Error | string } }> {
    render() {
        const { pluginErrors } = this.props;
        const pluginsWithErrors = Object.keys(pluginErrors);
        const hasErrors = pluginsWithErrors.length > 0;
        return hasErrors && (
            <Alert bsStyle="danger">
                <ul
                    style={{
                        listStyleType: 'none'
                    }}
                >
                    {pluginsWithErrors.map(key => (
                        <li key={key}><strong>{key}</strong>: {pluginErrors[key]}</li>
                    ))}
                </ul>
            </Alert>
        );
    }
}

class AdminFormContainer extends React.PureComponent<AdminFormContainerProps> {
    componentWillMount() {
        const { initialize } = this.props;
        if (initialize) {
            initialize();
        }
    }

    render() {
        const { isEditing, pluginErrors = {}, currentLocation } = this.props;

        return (
            <div>
                <AdminFormErrorDisplay pluginErrors={pluginErrors} />
                {isEditing
                    ? <AdminForm {...this.props as {}} />
                    : <AdminFormComponent {...this.props} />
                }
            </div>
        );
    }
}

// @ts-ignore
const combineMerge = (target, source, options) => {
    const destination = target.slice();

    source.forEach((item: any, index: number) => {
        if (typeof destination[index] === 'undefined') {
            destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
        } else if (options.isMergeableObject(item)) {
            destination[index] = merge(target[index], item, options);
        } else if (target.indexOf(item) === -1) {
            destination.push(item);
        }
    });
    return destination;
};

export default class extends
    connect<AdminFormContainerStateProps, AdminFormContainerDispatchProps, AdminFormProps, RootState>(
        (state, { plugins, selectedSection }) => {
            let initialValues: any = {};

            // Filter out any plugins that the user doesn't have permission to access
            const { appScopes = {}, authScopes } = currentUserRoleScopes(state);

            // Filter out plugins that don't have scopes assigned
            const pluginsToRender = (plugins)
                ? plugins
                    .filter((plugin: any) => {
                        return plugin.useAuth !== false
                            ? Object.keys(appScopes).indexOf(plugin.name) > -1
                            : true;
                    })
                    .filter(s => s !== undefined)
                : [];

            const pluginFilters = {};

            // @ts-ignore
            initialValues = pluginsToRender
                .map(p => {
                    const filters = (state[p.reduxFormKey].pluginFilters)
                        ? (state[p.reduxFormKey].pluginFilters)
                        : {};

                    const data = p.getData(state, filters);
                    if (data !== undefined) {
                        const pluginState = {};
                        pluginState[p.reduxFormKey] = data;
                        pluginFilters[p.reduxFormKey] = filters;
                        return pluginState;
                    }
                    return undefined;
                })
                .reduce(
                    (initValues, val) => {
                        return merge(initValues, val, { arrayMerge: combineMerge });
                    },
                    {}
                );

            return {
                plugins: pluginsToRender,
                currentLocation: currentLocationSelector(state),
                isLocationSet: isLocationSetSelector(state),
                initialValues: initialValues,
                pluginPermissions: { ...appScopes },
                pluginAuth: authScopes,
                pluginState: { ...initialValues },
                pluginFilters: pluginFilters,
                selectedSection: selectedSection,
                ...collectPluginErrors(state, formConfig.form, plugins)
            };
        },
        (dispatch, { plugins = [], onSelectSection }) => {
            if (onSelectSection !== undefined) {
                console.log('onSelectSection custom function - test me!');
                // @ts-ignore Ignore the warning, we're checking to see if onSelectSection is defined
                onSelectSection = (sectionName: string) => onSelectSection(sectionName)(dispatch);
            } else {
                console.log('onSelectSection default function');
                onSelectSection = (sectionName) => {
                    dispatch(selectAdminFormSection(sectionName));
                };
            }

            return {
                dispatch, // Just pass dispatch through so we can use it in plugins
                initialize: () => {
                    // TODO: This needs to go?
                    dispatch(selectAdminFormSection());
                    dispatch(setAdminFormPluginSubmitErrors());
                    plugins.forEach(p => {

                        p.fetchData(dispatch, {}); // TODO: {} denotes an empty set of filters
                        p.dispatch = dispatch;
                    });
                },
                onSelectSection: onSelectSection,
                // TODO: Restrict scope to the current section / plugin, live with onSelectSection!
                setPluginFilters: (filters: {}, action: any) => {
                    if (filters && action) dispatch(action(filters));
                },
                showSheriffProfileModal: (sheriffId: IdType, isEditing: boolean = false, sectionName?: string) => {
                    dispatch(SheriffProfileModal.ShowAction(sheriffId, isEditing, sectionName));
                }
            };
        }
    )(AdminFormContainer as any) {
        static defaultProps: Partial<AdminFormProps & { children?: React.ReactNode }> = {
            plugins: []
        };

        static SubmitButton = AdminFormSubmitButton;
        static resetAction = () => reset(formConfig.form);
    }
