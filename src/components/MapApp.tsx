import React from 'react';
import './MapApp.css';
import EsriMap from './EsriMap/EsriMap';
import data from '../data/data';

class MapApp extends React.Component {
  constructor(props: any){
    super(props);
  }
  render() {
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
    console.log(municipalityByName, 'municipalityByName');
    return (
      <div className="App-container">
        <EsriMap municipalityData={municipalityByName} />
      </div>
    )
  }
}

export default MapApp;
