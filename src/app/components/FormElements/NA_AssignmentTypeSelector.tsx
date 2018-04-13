// import * as React from 'react';
// import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
// import { FormControl } from 'react-bootstrap';


// export default class AssignmentTypeSelector extends React.PureComponent<FormFieldWrapperProps>{
//     render(){
//         const { input:{value, onChange}, label} = this.props;
//         return (
//             <FormFieldWrapper {...this.props}>
//                 <FormControl componentClass="select" value={value} onChange={onChange}>
//                     <option value="No assignment type selected">{`Select ${label}`}</option>
//                     <option value="Court Security">Court Security</option>
//                     <option value="Document Services">Document Services</option>
//                     <option value="Escort Services">Escort Services</option>
//                     <option value="Gate Security">Gate Security</option>
//                     <option value="Other">Other</option>
//                 </FormControl>
//             </FormFieldWrapper>
//         );
//     }
// }