import * as React from 'react';
import { ToastContainer, toast as _toast, Zoom, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastManager.css';

// This is where we can globally customize both the css that we load for the toasts
// and the options that each toast will get by default (i.e. add props to ToastContainer)
export default class ToastManager extends React.PureComponent {
    render() {
        return (
            <ToastContainer
                position={_toast.POSITION.TOP_CENTER}
                hideProgressBar={true}
                transition={Zoom}
                closeButton={false}
            />
        );
    }
}

class ToastMessage extends React.PureComponent<{ title: string, text: string }> {
    render() {
        const { title, text } = this.props;
        return (
            <span><strong>{title}: {text}</strong></span>
        );
    }
}

export namespace toast {
    export function success(text: string, options?: ToastOptions) {
        _toast.success(<ToastMessage title="Success" text={text} />, { autoClose: 2500, ...options });
    }

    export function warn(text: string, options?: ToastOptions) {
        _toast.warn(<ToastMessage title="Warning" text={text} />, options);
    }

    export function error(text: string, options?: ToastOptions) {
        _toast.error(<ToastMessage title="Error" text={text} />, {
            autoClose: false,
            closeOnClick: true,
            closeButton: true,
            ...options
        });
    }
}
