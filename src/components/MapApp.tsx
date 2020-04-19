import React, { ChangeEvent } from 'react';
import './MapApp.css';
import EsriMap from './EsriMap/EsriMap';
import data from '../data/data';
import { FormControl, FormControlLabel, Checkbox, FormLabel, FormGroup, RadioGroup, Radio, Button } from '@material-ui/core';

interface State {
  renderer:string;
  municipalityByName: {
    [key: string]: {
      municipality: string;
      number: number | string;
      percent: number | string;
    }
  }
}

class MapApp extends React.Component<{}, State> {
  constructor(props: any){
    super(props);

    this.state = {
      renderer: "colors",
      municipalityByName: {},
    }
  }

  changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ renderer : e.target.value })
  }

  componentDidMount = () => {
    console.log(data);
    let municipalitiesData = data;
    let municipalityByName: {
      [key: string]: {
        municipality: string;
        number: number | string;
        percent: number | string;
      }
    } = {};
    municipalitiesData.forEach(municipality => {
      console.log(municipality.municipality);
      municipalityByName[municipality.municipality] = municipality;
    });

    this.setState({
      municipalityByName
    })
  }

  render() {
    return (
      <div className="App-container">

        <FormControl component="fieldset">
          <FormLabel component="legend">Mark one</FormLabel>
          <RadioGroup onChange={(e) => this.changeCheckbox(e)} value={this.state.renderer}>
            <FormControlLabel
              control={<Radio name={"Colors"} />}
              value="colors"
              label={"Colors"} />
            <FormControlLabel
              control={<Radio name={"Points"} />}
              value="points"
              label={"Points"} />
            </RadioGroup>
            <Button type="submit">Submit</Button>
        </FormControl>

        <EsriMap municipalityData={this.state.municipalityByName} renderer={this.state.renderer} />
      </div>
    )
  }
}

export default MapApp;
