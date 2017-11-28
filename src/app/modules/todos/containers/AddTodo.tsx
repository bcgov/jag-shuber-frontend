import * as React from 'react'
import { connect,DispatchProp } from 'react-redux'
import { addTodo } from '../actions'
import {Button,Form,FormControl} from 'react-bootstrap'



class AddTodo extends React.PureComponent<DispatchProp<any>>{
  private input:any;
  render(){
    const {dispatch=(a:any)=>{}} = this.props;
    return (
      <div>
        <Form inline
          onSubmit={e => {
            e.preventDefault()
            if (!this.input.value.trim()) {
              return
            }
            dispatch(addTodo(this.input.value))
            this.input.value = ''
          }}
        >        
          <FormControl
            type='text'
            placeholder='New Item'
            inputRef={(ref) => {
                 this.input = ref;
            }}
          />
          <Button type="submit">
            Add Todo
          </Button>
        </Form>
      </div>
    )
  }
}

export default connect()(AddTodo)