import React from 'react';
import {
    reduxForm,
    ConfigProps,
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
import { toast } from '../components/ToastManager/ToastManager';
import { RequestActionConfig } from '../infrastructure/Requests/RequestActionBase';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';

import { currentLocation } from '../modules/user/selectors';
import toTitleCase from '../infrastructure/toTitleCase';

import { RootState } from '../store';

import { Sheriff } from '../api';

import {
    getSheriff,
    selectedSheriffProfileSection,
    getSheriffProfilePluginErrors
} from '../modules/sheriffs/selectors';
import {
    updateSheriff,
    createSheriff,
    selectSheriffProfileSection,
    setSheriffProfilePluginSubmitErrors,
} from '../modules/sheriffs/actions';

import SheriffProfileComponent, { SheriffProfileProps } from '../components/SheriffProfile/SheriffProfile';
import { SheriffProfilePlugin } from '../components/SheriffProfile/SheriffProfilePlugin';

// Import Sheriff Profile plugins
import SheriffProfilePluginIdentification from './SheriffProfilePluginIdentification';
import SheriffProfilePluginHeader from './SheriffProfilePluginHeader/SheriffProfilePluginHeader';
import SheriffProfilePluginLocation from './SheriffProfilePluginLocation';
import SheriffProfilePluginLeaves from './SheriffProfilePluginLeaves/SheriffProfilePluginLeaves';
import SheriffProfilePluginTraining from './SheriffProfilePluginLeaves/SheriffProfilePluginTraining';
import SheriffProfilePluginRoles from './SheriffProfilePluginRoles/SheriffProfilePluginRoles';

async function submitPlugins(
    sheriffId: string,
    values: any,
    dispatch: Dispatch<any>,
    plugins: SheriffProfilePlugin<any>[] = []
) {
    if (sheriffId) {
        // try creating resources catching errors so that we can throw a submission error at the end
        const pluginErrors: FormErrors = {};
        await Promise.all(plugins.map(async p => {
            try {
                await p.onSubmit(sheriffId, values, dispatch);
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
            dispatch(setSheriffProfilePluginSubmitErrors(pluginErrorMessages));
            throw new SubmissionError({ ...formErrors });
        }
    }
}

function collectPluginErrors(state: any, formName: string, plugins: SheriffProfilePlugin<any>[] = []) {
    const includeErrors = hasSubmitFailed(formName)(state);
    if (!includeErrors) {
        return {
            pluginsWithErrors: {},
            pluginErrors: {}
        };
    }
    const pluginErrors = includeErrors ? getSheriffProfilePluginErrors(state) : {};
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

const formConfig: ConfigProps<any, SheriffProfileProps> = {
    form: 'SheriffProfile',
    enableReinitialize: true,
    validate: (values: any, { plugins = [] }) => {
        const validationErrors = plugins.reduce((errors, plugin) => {
            const pluginValues = values[plugin.name];
            const pluginErrors = plugin.validate(pluginValues);
            if (pluginErrors) {
                errors[plugin.name] = {...pluginErrors};
            }
            // console.log('dump sheriff profile form errors');
            // console.log(errors);
            return errors;
        }, {} as FormErrors);
        return {...validationErrors};
    },
    onSubmit: async (values: any, dispatch, { sheriffId, plugins = [] }: SheriffProfileProps) => {
        const { sheriff }: { sheriff: Partial<Sheriff> } = values;
        let sheriffEntityId: string;
        const profileUpdateConfig: RequestActionConfig<Sheriff> = {
            toasts: {
                error: (e) => `Error occurred while creating/updating Sheriff: ${e}`
            }
        };
        let actionMessage = '';
        if (sheriff.id) {
            const updatedSheriff = await dispatch(updateSheriff(sheriff, profileUpdateConfig));
            sheriffEntityId = updatedSheriff.id;
            actionMessage = 'updated';
        } else {
            const createdSheriff = await dispatch(createSheriff(sheriff, profileUpdateConfig));
            sheriffEntityId = createdSheriff.id;
            actionMessage = 'created';
        }

        try {
            await submitPlugins(sheriffEntityId, values, dispatch, plugins);
        } catch (e) {
            toast.warn('An issue occured with one of the sections');
            throw e;
        }

        const sheriffName = toTitleCase(`${sheriff.firstName} ${sheriff.lastName}`)
        toast.success(`${sheriffName}'s profile ${actionMessage}`);
    }
};

// Wire up the Form to redux Form
const SheriffProfileForm = reduxForm<any, SheriffProfileProps>(formConfig)(SheriffProfileComponent);

interface SheriffProfileContainerStateProps {
    pluginsWithErrors: { [key: string]: boolean };
    pluginErrors: { [key: string]: Error | string };
    selectedSection?: string;
}

interface SheriffProfileContainerDispatchProps {
    initialize: () => void;
    onSelectSection: (sectionName: string) => void;
}

type SheriffProfileContainerProps = SheriffProfileProps &
    InjectedFormProps<any, SheriffProfileProps>
    & SheriffProfileContainerStateProps
    & SheriffProfileContainerDispatchProps;

class SheriffProfileErrorDisplay extends React.PureComponent<{ pluginErrors: { [key: string]: Error | string } }>{
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

class SheriffProfileContainer extends React.PureComponent<SheriffProfileContainerProps> {
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
                <SheriffProfileErrorDisplay pluginErrors={pluginErrors} />
                {isEditing
                    ? <SheriffProfileForm {...this.props as any} />
                    : <SheriffProfileComponent {...this.props} />}
            </div>
        );
    }
}

export default class extends
    connect<SheriffProfileContainerStateProps, SheriffProfileContainerDispatchProps, SheriffProfileProps, RootState>(
        (state, { sheriffId, plugins = [] }) => {
            let initialValues: any = {};
            if (sheriffId) {
                initialValues = plugins
                    .map(p => {
                        const data = p.getData(sheriffId, state);
                        if (data !== undefined) {
                            const pluginState = {};
                            pluginState[p.name] = data;
                            return pluginState;
                        }
                        return undefined;
                    })
                    .filter(s => s !== undefined)
                    .reduce(
                        (initValues, val) => {
                            return { ...initValues, ...val };
                        },
                        {
                            sheriff: getSheriff(sheriffId)(state)
                        }
                    );
            } else {
                const contextLocation = currentLocation(state);
                const initialSheriff: Partial<Sheriff> = {
                    homeLocationId: contextLocation,
                    currentLocationId: contextLocation
                };
                initialValues.sheriff = { ...initialSheriff };
            }

            return {
                initialValues,
                pluginState: { ...initialValues },
                selectedSection: selectedSheriffProfileSection(state),
                ...collectPluginErrors(state, formConfig.form, plugins)
            };
        },
        (dispatch, { sheriffId, plugins = [] }) => {
            return {
                initialize: () => {
                    dispatch(selectSheriffProfileSection());
                    dispatch(setSheriffProfilePluginSubmitErrors());
                    plugins.forEach(p => {
                        p.fetchData(sheriffId, dispatch);
                        p.fetchData(sheriffId, dispatch);
                    });
                },
                onSelectSection: (sectionName) => dispatch(selectSheriffProfileSection(sectionName))
            };
        }
    )(SheriffProfileContainer as any) {
    static defaultProps: Partial<SheriffProfileProps & { children?: React.ReactNode }> = {
        plugins: [
            new SheriffProfilePluginHeader(),
            new SheriffProfilePluginIdentification(),
            new SheriffProfilePluginLocation(),
            new SheriffProfilePluginLeaves(),
            new SheriffProfilePluginTraining(),
            // new SheriffProfilePluginRoles()
        ]
    };
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )

    static resetAction = () => reset(formConfig.form);
}
