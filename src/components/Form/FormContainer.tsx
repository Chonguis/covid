import React, { Component, ChangeEvent, FormEvent } from 'react';
import './FormContainer.css';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { allCountries, statesArray } from './countries';

const inputsData = [
  {id: 'country', label: 'Country'},
  {id: 'state', label: 'State'},
];

interface State {
  country: string;
  state: string;
  [key: string]: string;
}

interface Props {
  onSubmitForm: (e: FormEvent<HTMLFormElement>, filterState: {country: string; state: string;}) => void;
  submitted: boolean;
}

class Form extends Component<Props, State> {
  constructor(props: any){
    super(props);

    this.state = {
      country: '',
      state: '',
    }
  }

  onChangeInput = (event: ChangeEvent<HTMLInputElement>, id: string):void => {
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
  }

  onChangeSelect = (event: ChangeEvent<{}>, value:string |  null, id: string):void => {
    if (value) {
      if (id === "country") {
        this.setState({
          ...this.state,
          [id]: value,
          state: "",
        });
      } else {
        this.setState({
          ...this.state,
          [id]: value,
        });
      }
    }
  }

  render() {

    let inputsHTML: JSX.Element[] = [];
    
    inputsData.forEach(data => {
      if (data.id === "state" && this.state.country !== "USA") return;
      else {
        inputsHTML.push(
          <div className="autocomplete">
            <Autocomplete
              id="combo-box-demo"
              options={data.id === "state" ? statesArray : allCountries.sort()}
              onChange={(event: ChangeEvent<{}>, value: string | null) => this.onChangeSelect(event, value, data.id)}
              renderInput={(params) => <TextField {...params} label={data.label} variant="outlined" />}
              value={this.state[data.id]}
            />
          </div>)
      }
    })

      return (
          <div className={`container ${!this.props.submitted && "defaultPosition"}`}>
              <form className={"form"} onSubmit={(e) => this.props.onSubmitForm(e, this.state)}>
                {inputsHTML}
                <button type="submit" className="submit" disabled={!this.state.country}>Submit</button>                
              </form>
              <small>
                <em style={{marginTop: "20px", display: "block"}}>API used for data:<a target="_blank" href=" https://rapidapi.com/astsiatsko/api/coronavirus-monitor">https://rapidapi.com/astsiatsko/api/coronavirus-monitor</a></em> 
              </small>
          </div>
      );
  }
}

export default Form;
