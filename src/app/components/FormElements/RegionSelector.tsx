import * as React from 'react';
import { FormFieldWrapperProps } from './FormFieldWrapper';
import { REGION } from '../../api';
import Selector from './Selector';


export default class RegionSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){        
        const data = Object.keys(REGION).map((key, index)=>({key, value:REGION[key]}));
        return (
            <Selector data={data} {...this.props}/>
        );
    }
}