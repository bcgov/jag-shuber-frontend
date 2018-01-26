import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';


export default class CourthouseSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const { input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No courthouse selected">{`Select ${label}`}</option>
                    <option value="Campbell River">Campbell River</option>
                    <option value="Chilliwack">Chilliwack</option>
                    <option value="Courtenay">Courtenay</option>
                    <option value="Duncan">Duncan</option>
                    <option value="Gold River">Gold River</option>
                    <option value="Kamloops">Kamloops</option>
                    <option value="Nanaimo">Nanaimo</option>
                    <option value="New Westminster">New Westminster</option>
                    <option value="North Vancouver">North Vancouver</option>
                    <option value="Port Alberni">Port Alberni</option>
                    <option value="Port Coquitlam">Port Coquitlam</option>
                    <option value="Port Hardy">Port Hardy</option>
                    <option value="Powell River">Powell River</option>
                    <option value="Prince George">Prince George</option>
                    <option value="Richmond">Richmond</option>
                    <option value="Surrey">Surrey</option>
                    <option value="Sidney">Sidney</option>
                    <option value="Vancouver - 222 Main">Vancouver - 222 Main</option>
                    <option value="Vancouver - VLC">Vancouver - VLC</option>
                    <option value="Vancouver Robson Square">Vancouver Robson Square</option>
                    <option value="Victoria">Victoria</option>
                </FormControl>
            </FormFieldWrapper>
        );
    }
}