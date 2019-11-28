import React from 'react';
import {
    reduxForm,
    ConfigProps,
    // getFormSyncErrors,
    // getFormAsyncErrors,
    // getFormSubmitErrors,
    // hasSubmitFailed,
    InjectedFormProps,
    // SubmissionError,
    FormErrors,
    reset
} from 'redux-form';

import { connect, Dispatch } from 'react-redux';

import { Alert } from 'react-bootstrap';
import { toast } from '../../components/ToastManager/ToastManager';
import { RequestActionConfig } from '../../infrastructure/Requests/RequestActionBase';
import { default as FormSubmitButton, SubmitButtonProps } from '../../components/FormElements/SubmitButton';

import { currentLocation } from '../../modules/user/selectors';
import toTitleCase from '../../infrastructure/toTitleCase';

import { RootState } from '../../store';

import { Role } from '../../api';

import {
    getRole,
    // selectedRoleProfileSection,
    // getRoleProfilePluginErrors
} from '../../modules/roles/selectors';
import {
    updateRole,
    createRole,
    // selectRoleProfileSection,
    // setRoleProfilePluginSubmitErrors,
} from '../../modules/roles/actions';

import AdminRolesComponent, { AdminRolesProps } from './AdminRolesGrid';

/*async function submitPlugins(
    roleId: string,
    values: any,
    dispatch: Dispatch<any>,
    plugins: RoleProfilePlugin<any>[] = []
) {
    if (roleId) {
        // try creating resources catching errors so that we can throw a submission error at the end
        const pluginErrors: FormErrors = {};
        await Promise.all(plugins.map(async p => {
            try {
                await p.onSubmit(roleId, values, dispatch);
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
                }
            });
            dispatch(setRoleProfilePluginSubmitErrors(pluginErrorMessages));
            throw new SubmissionError({ ...formErrors });
        }
    }
}

function collectPluginErrors(state: any, formName: string, plugins: RoleProfilePlugin<any>[] = []) {
    const includeErrors = hasSubmitFailed(formName)(state);
    if (!includeErrors) {
        return {
            pluginsWithErrors: {},
            pluginErrors: {}
        };
    }
    const pluginErrors = includeErrors ? getRoleProfilePluginErrors(state) : {};
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
}*/

const formConfig: ConfigProps<any, AdminRolesProps> = {
    form: 'AdminRoles',
    enableReinitialize: true,
    validate: (values: any, { plugins = [] }) => {
        const validationErrors = plugins.reduce((errors, plugin) => {
            const pluginValues = values[plugin.name];
            const pluginErrors = plugin.validate(pluginValues);
            if (pluginErrors) {
                errors[plugin.name] = {...pluginErrors};
            }
            return errors;
        }, {} as FormErrors);
        return {...validationErrors};
    },
    onSubmit: async (values: any, dispatch, { roleId, plugins = [] }: AdminRolesProps) => {
        const { role }: { role: Partial<Role> } = values;
        let roleEntityId: string;
        const profileUpdateConfig: RequestActionConfig<Role> = {
            toasts: {
                error: (e) => `Error occured while creating/updating Role: ${e}`
            }
        };
        let actionMessage = '';
        if (role.id) {
            const updatedRole = await dispatch(updateRole(role, profileUpdateConfig));
            roleEntityId = updatedRole.id;
            actionMessage = 'updated';
        } else {
            const createdRole = await dispatch(createRole(role, profileUpdateConfig));
            roleEntityId = createdRole.id;
            actionMessage = 'created';
        }

        try {
            // TODO: Do we still need plugin functionality, I don't think so
            // await submitPlugins(roleEntityId, values, dispatch, plugins);
        } catch (e) {
            toast.warn('An issue occured with one of the sections');
            throw e;
        }

        const roleName = toTitleCase(`${role.firstName} ${role.lastName}`)
        toast.success(`${roleName}'s profile ${actionMessage}`);
    }
};

// Wire up the Form to redux Form
const AdminRolesForm = reduxForm<any, AdminRolesProps>(formConfig)(AdminRolesComponent);

interface AdminRolesContainerStateProps {
    pluginsWithErrors: { [key: string]: boolean };
    pluginErrors: { [key: string]: Error | string };
    selectedSection?: string;
}

interface AdminRolesContainerDispatchProps {
    initialize: () => void;
    onSelectSection: (sectionName: string) => void;
}

type AdminRolesContainerProps = AdminRolesProps &
    InjectedFormProps<any, AdminRolesProps>
    & AdminRolesContainerStateProps
    & AdminRolesContainerDispatchProps;

class AdminRolesErrorDisplay extends React.PureComponent<{ pluginErrors: { [key: string]: Error | string } }>{
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

class AdminRolesContainer extends React.PureComponent<AdminRolesContainerProps> {
    componentWillMount() {
        const { initialize } = this.props;
        if (initialize) {
            initialize();
        }
    }

    render() {
        const { isEditing, pluginErrors = {} } = this.props;

        return (
            <div>
                <AdminRolesErrorDisplay pluginErrors={pluginErrors} />
                {isEditing
                    ? <AdminRolesForm {...this.props as any} />
                    : <AdminRolesComponent {...this.props} />}
            </div>
        );
    }
}

export default class extends
    connect<AdminRolesContainerStateProps, AdminRolesContainerDispatchProps, AdminRolesProps, RootState>(
        (state, { roleId, plugins = [] }) => {
            let initialValues: any = {};
            if (roleId) {
                initialValues = plugins
                    .map(p => {
                        const data = p.getData(roleId, state);
                        if (data != undefined) {
                            const pluginState = {};
                            pluginState[p.name] = data;
                            return pluginState;
                        }
                        return undefined;
                    })
                    .filter(s => s != undefined)
                    .reduce(
                        (initValues, val) => {
                            return { ...initValues, ...val };
                        },
                        {
                            role: getRole(roleId)(state)
                        }
                    );
            } else {
                const contextLocation = currentLocation(state);
                const initialRole: Partial<Role> = {
                    homeLocationId: contextLocation,
                    currentLocationId: contextLocation
                };
                initialValues.role = { ...initialRole };
            }

            return {
                initialValues,
                pluginState: { ...initialValues },
                // selectedSection: selectedAdminRolesSection(state),
                // ...collectPluginErrors(state, formConfig.form, plugins)
            };
        },
        (dispatch, { roleId, plugins = [] }) => {
            return {
                initialize: () => {
                    // dispatch(selectAdminRolesSection());
                    // dispatch(setAdminRolesPluginSubmitErrors());
                    // plugins.forEach(p => {
                        // p.fetchData(roleId, dispatch);
                    // });
                },
                // onSelectSection: (sectionName) => dispatch(selectAdminRolesSection(sectionName))
            };
        }
    )(AdminRolesContainer as any) {
    static defaultProps: Partial<AdminRolesProps & { children?: React.ReactNode }> = {
        // TODO: Why isn't this being lazy loaded?
        /*plugins: [
            new AdminRolesPluginHeader(),
            new AdminRolesPluginIdentification(),
            new AdminRolesPluginLocation(),
            new AdminRolesPluginLeaves(),
            new AdminRolesPluginTraining(),
            new AdminRolesPluginRoles()
        ]*/
        plugins: []
    };
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )

    static resetAction = () => reset(formConfig.form);
}
