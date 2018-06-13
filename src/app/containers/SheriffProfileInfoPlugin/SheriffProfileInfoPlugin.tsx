import {
    SheriffProfilePluginBase,
} from '../../components/SheriffProfile/SheriffProfilePlugin';
import SheriffProfileInfoPluginDisplay from './SheriffProfileInfoPluginDisplay';
import SheriffProfileInfoPluginForm from './SheriffProfileInfoPluginForm';

export default class SheriffProfileInfoPlugin extends SheriffProfilePluginBase {
    DisplayComponent = SheriffProfileInfoPluginDisplay;
    FormFieldComponent = SheriffProfileInfoPluginForm;
    onUpdate(formValues: any) {
        alert('onUpdate');
    }

    onCreate(formValues: any) {
        alert('onCreate');
    }
}