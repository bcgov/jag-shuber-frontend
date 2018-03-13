import * as React from 'react'
import {
    Button
} from 'react-bootstrap'
import {
    submit
} from 'redux-form'
import {connect } from 'react-redux'
import { ButtonProps } from 'react-bootstrap';

export interface SubmitButtonProps extends Partial<ButtonProps>{
    formName:string,
    submit?:()=>void;
    onSubmit?:()=>void;
}

class SubmitButton extends React.PureComponent<SubmitButtonProps>{
    private handleSubmit(){
        const {submit,onSubmit} = this.props;
        if(submit){
            submit();
        }
        if(onSubmit){
            onSubmit();
        }
    }
    render(){
        const {formName,submit,children="Save",...rest} = this.props;
        const {bsStyle="primary"} = rest;
        return (
            <Button onClick={()=>this.handleSubmit()} bsStyle={bsStyle} >{children}</Button>
        )
    }
};

const mapDispatchToProps = (dispatch:any,ownProps:SubmitButtonProps)=>{
    return {
        submit:()=> dispatch(submit(ownProps.formName))
    }
}

export default connect<SubmitButtonProps>(null,mapDispatchToProps)(SubmitButton);