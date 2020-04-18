import React, {ChangeEvent, FormEvent} from 'react';
import './DemographicForm.css'
import { TextField, Button, FormControl } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { allCountries } from '../../data/countries';

interface Props {
  title: string;
  description: string;  
  onChangeSelect: (event: ChangeEvent<{}>, value: string | null, id:string,) => void;
  onChangeAge: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => void;
  onSubmitDemographics: (event: FormEvent<HTMLFormElement>) => void;
  ageVal: string | null;
  autocompleteVal: string | null;
}

const DemographicForm:React.FC<Props> = ({onChangeSelect, onChangeAge, onSubmitDemographics, ageVal, autocompleteVal}) => {
  return (
    <div>
      <div>
        <form onSubmit={onSubmitDemographics}>
          <div className="DemographicForm-inputs-container">
            <TextField label="Age" type="number" 
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChangeAge(event, "age")}   
              value={ageVal}       
            />
            <Autocomplete
              className="DemographicForm-autocomplete"
              id="combo-box-demo"
              options={allCountries.sort()}
              onChange={(event: ChangeEvent<{}>, value: string | null) => onChangeSelect(event, value, "country")}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
              value={autocompleteVal}
            />
          </div>
          <Button type="submit" variant="outlined">Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default DemographicForm;
