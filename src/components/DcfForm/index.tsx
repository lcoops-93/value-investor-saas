// import { Form } from 'semantic-ui-react'
import {Form} from 'formsy-semantic-ui-react';
import {Label} from 'semantic-ui-react';
import { useState } from 'react';
import {FormDataType} from '../DcfTools/dcfToolsTypes'

type CallbackFunctionType = (formData: FormDataType) => void

interface DcfFormProps {
  onSubmitCallback: CallbackFunctionType
}

const DcfForm = ({onSubmitCallback}:DcfFormProps) => {
  const [formState, setFormState] = useState({ cagr: '', yearsToForcast: '5', discountRate: '', terminalGrowth: ''})
  const { cagr, yearsToForcast, discountRate, terminalGrowth} = formState

  const handleChange = (_e:any, { name, value } : any) => setFormState({...formState, [name]: value })

  const handleValidSubmit = () => {
    console.log("Submitted")
    onSubmitCallback({ 
      cagr:parseInt(cagr), 
      yearsToForcast:parseInt(yearsToForcast), 
      discountRate:parseInt(discountRate),
      terminalGrowth:parseInt(terminalGrowth),
      initialised: true})
  }

  const isInPctRange = (_values:any, value:any) => {
    const parsedInt = parseInt(value)
    const maxInput = 500
    if (!parsedInt){
      return false
    }
    return ((Math.abs(parsedInt) < maxInput) ? true : `Number Must be Less Than ${maxInput}`)
  }

  const isInForcastRange = (_values:any, value:any) => {
    const parsedInt = parseInt(value)
    const maxInput = 20
    const minInput = 0
    if (!parsedInt){
      return false
    }
    else if (parsedInt < minInput)
    {
      return ("Must Be a Positive Number")
    }
    else if (parsedInt > maxInput)
    {
      return ("Even Buffett can't forecast that far into the future!")
    }
    return (true)
  }

  return(
    <div>
      <Form onValidSubmit={ handleValidSubmit }>
        <Form.Group>
          <Form.Input
            placeholder='eg. 10'
            name='cagr'
            value={cagr}
            label='CAGR (%)'
            onChange={handleChange}
            validations={{isInt:true, isInPctRange}}
            validationErrors={{ isInt: 'Enter a Valid Number'}}
            errorLabel={<Label color="red" pointing />}
          />
          <Form.Input
            placeholder='eg. 5'
            name='yearsToForcast'
            value={yearsToForcast}
            label='Years To Forcast'
            onChange={handleChange}
            validations={{isInt:true, isInForcastRange}}
            validationErrors={{ isInt: 'Enter a Valid Number'}}
            errorLabel={<Label color="red" pointing />}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            placeholder='eg. 7'
            name='discountRate'
            value={discountRate}
            label='Discount Rate (%)'
            onChange={handleChange}
            validations={{isInt:true, isInPctRange}}
            validationErrors={{ isInt: 'Enter a Valid Number'}}
            errorLabel={<Label color="red" pointing />}
          />
          <Form.Input
            placeholder='eg. 5'
            name='terminalGrowth'
            value={terminalGrowth}
            label='Terminal Growth Rate (%)'
            onChange={handleChange}
            validations={{isInt:true, isInPctRange}}
            validationErrors={{ isInt: 'Enter a Valid Number'}}
            errorLabel={<Label color="red" pointing />}
          />
        </Form.Group>
        <Form.Button primary content='Calculate' />
      </Form>    
    </div>
  )
}

export default DcfForm