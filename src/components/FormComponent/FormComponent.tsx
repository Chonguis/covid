import React, { FormEvent, ChangeEvent } from 'react';
import './FormComponent.css';
import { FormControl, FormControlLabel, Checkbox, FormLabel, FormGroup, RadioGroup, Radio, Button } from '@material-ui/core';
import Checklist from './Checklist/Checklist';

interface Props {
  inputs: string[];
  title: string;
  description: string;
  multiple?: boolean;
  symptonValue: string;
  changeCheckbox: (e: ChangeEvent<HTMLInputElement>, id?: string) => void;
  symptonsState?: {
    severeBreathing: boolean | undefined;
    severeFever: boolean | undefined;
    severePressure: boolean | undefined;
  
    cough: boolean | undefined;
    fever: boolean | undefined,
  
    travel: boolean | undefined;
    directContact: boolean | undefined;
    work: boolean | undefined;
  
    highBloodPressure: boolean | undefined;
    asthma: boolean | undefined;
    extremeObesity: boolean | undefined;
    heartProblems: boolean | undefined;

    highRiskAge: boolean | undefined;    

    [key: string]: boolean | undefined;
  }
}

const FormComponent:React.FC<Props> = ({inputs, title, description, multiple, changeCheckbox, symptonValue, symptonsState }) => {
  let form: JSX.Element;
  console.log('newSymptonsState', symptonsState);
  if(multiple && symptonsState !== undefined){
    form = 
    <FormControl component="fieldset">
      <FormLabel component="legend">Mark all that apply</FormLabel>
      <FormGroup>
        {inputs.map((input, i) => {
          return <FormControlLabel
            control={<Checkbox checked={symptonsState[input]} name={input} onChange={(e) => changeCheckbox(e, input)} />}
            label={input}
            key={input + i}
          />
        })}
      </FormGroup>
      <Button type="submit">Submit</Button>
  </FormControl>

    
  } else {
    form = 
    <FormControl component="fieldset">
      <FormLabel component="legend">Mark one</FormLabel>
      <RadioGroup value={symptonValue} onChange={(e) => changeCheckbox(e)}>
        {inputs.map(input => {
          return <FormControlLabel
            control={<Radio name={input} />}
            label={input}
            value={input}
          />
        })}
        <FormControlLabel
            control={<Radio name={"Both"} />}
            value="Both"
            label={"Both"} />
            <FormControlLabel
            control={<Radio name={"None"} />}
            value="None"
            label={"None"} />
      </RadioGroup>
      <Button type="submit">Submit</Button>
    </FormControl>
  }
  return (
    <div className="FormComponent-form">
      <h1>{title}</h1>
      <p>{description}</p>
      {form}
    </div>
  )
}

export default FormComponent;