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
    FormErrors
} from 'redux-form';
import { connect, Dispatch } from 'react-redux';
import SheriffProfileComponent, { SheriffProfileProps } from '../components/SheriffProfile/SheriffProfile';
import { RootState } from '../store';
import SheriffProfilePluginIdentification from './SheriffProfilePluginIdentification';
import SheriffProfilePluginHeader from './SheriffProfilePluginHeader';
import SheriffProfilePluginLocation from './SheriffProfilePluginLocation';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton';
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
import SheriffProfilePluginLeaves from './SheriffProfilePluginLeaves';
import { SheriffProfilePlugin } from '../components/SheriffProfile/SheriffProfilePlugin';
import { toast } from '../components/ToastManager/ToastManager';
import { RequestActionConfig } from '../infrastructure/Requests/RequestActionBase';
import { Alert } from 'react-bootstrap';


async function submitPlugins(sheriffId: string, values: any, dispatch: Dispatch<any>, plugins: SheriffProfilePlugin<any>[] = []) {
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
    onSubmit: async (values: any, dispatch, { sheriffId, plugins = [] }: SheriffProfileProps) => {
        const { sheriff }: { sheriff: Partial<Sheriff> } = values;
        let sheriffEntityId: string;
        const profileUpdateConfig: RequestActionConfig<Sheriff> = {
            toasts: {
                error: (e) => `Error occured while creating/updating Sheriff: ${e}`
            }
        };
        if (sheriff.id) {
            const updatedSheriff = await dispatch(updateSheriff(sheriff, profileUpdateConfig));
            sheriffEntityId = updatedSheriff.id;
        } else {
            const createdSheriff = await dispatch(createSheriff(sheriff, profileUpdateConfig));
            sheriffEntityId = createdSheriff.id;
        }

        try {
            await submitPlugins(sheriffEntityId, values, dispatch, plugins);
        } catch (e) {
            toast.warn("An issue occured with one of the sections")
            throw e;
        }
        toast.success("Sheriff Profile Updated");
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
    fetchData: () => void;
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
        const { fetchData } = this.props;
        if (fetchData) {
            fetchData();
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


export default class extends connect<SheriffProfileContainerStateProps, SheriffProfileContainerDispatchProps, SheriffProfileProps, RootState>(
    (state, { sheriffId, plugins = [] }) => {
        const initialValues = plugins
            .map(p => p.getData(sheriffId, state))
            .filter(s => s != undefined)
            .reduce(
                (initValues, val) => {
                    return { ...initValues, ...val };
                },
                {
                    sheriff: getSheriff(sheriffId)(state)
                }
            );

        return {
            initialValues,
            selectedSection: selectedSheriffProfileSection(state),
            ...collectPluginErrors(state, formConfig.form, plugins)
        };
    },
    (dispatch, { sheriffId, plugins = [] }) => {
        return {
            fetchData: () => {
                plugins.forEach(p => {
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
            new SheriffProfilePluginLeaves()
        ]
    };
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}
