import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';

export default class UploadField extends React.PureComponent<FormFieldWrapperProps> {
    input: any;

    getBase64Img = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    getPreviewUrl = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    onFileChange = async (e: any) => {
        const { input: { value, onChange } }  = this.props;

        const targetFile = e.target.files[0];
        if (targetFile) {
            // const val = await this.getBase64(targetFile);
            // Run redux form onChange handler
            if (onChange) {
                // onChange(val);
                // Quick n' dirty, just overload the object with new properties
                targetFile.getBase64Img = async () => await this.getBase64Img(targetFile);
                targetFile.getPreviewUrl = async () => await this.getPreviewUrl(targetFile);
                onChange(targetFile);
            }
        } else {
            onChange(null);
        }
    }

    render() {
        const { label, placeholder, disabled } = this.props;

        const placeholderValue = (placeholder) ? placeholder : `Enter ${label}`;

        return (
            <FormFieldWrapper {...this.props}>
                <FormControl
                    className={'form-control-file'}
                    ref={(input) => this.input = input}
                    type="file"
                    placeholder={placeholderValue}
                    // value={value}
                    onChange={this.onFileChange}
                    disabled={disabled}
                />
            </FormFieldWrapper>
        );
    }
}
