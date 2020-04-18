import * as React from 'react';
import './App.css';
import EsriMap from './EsriMap/EsriMap';
import data from '../data/data';

class Map extends React.Component {
  render() {
    console.log(data);
    let municipalitiesData = data;
    let municipalityByName: {
      municipality: string;
      percent: number;
      number: number;
      [key: string]: string | number
    }
    municipalitiesData.forEach(municipality => {
      municipalityByName[municipality.municipality] = municipality;
    });
    console.log(municipalityByName, 'municipalityByName');
    return (
      <div className="App-container">
        <EsriMap municipalityData={municipalityByName} />
      </div>
    )
  }
}

export default Map;
