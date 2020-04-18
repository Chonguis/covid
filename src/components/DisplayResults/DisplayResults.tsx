import React from 'react'
import './DisplayResults.css';
import FetchStateInterface from '../../interfaces/FetchStateInterface.interface';
import Result from './Result';

interface Props {
    fetchState: FetchStateInterface;
}

const numberWithCommas = (x: string | undefined) => {
  if (x) return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const DisplayResults:React.FC<Props> = (props) => {
    let deathRatio, recoveredRatio, activeRatio; 
    if (props.fetchState.total_cases && props.fetchState.total_deaths) {
      deathRatio = parseFloat(props.fetchState.total_deaths.replace(/,/g, '')) / parseFloat(props.fetchState.total_cases.replace(/,/g, '')) * 100;
      deathRatio = (Math.round(deathRatio * 10) / 10).toFixed(1) + "%";
    }
    if (props.fetchState.active_cases && props.fetchState.total_cases) {
      activeRatio = parseFloat(props.fetchState.active_cases.replace(/,/g, '')) / parseFloat(props.fetchState.total_cases.replace(/,/g, '')) * 100;
      activeRatio = (Math.round(activeRatio * 10) / 10).toFixed(1) + "%";
    } 
    if (props.fetchState.total_recovered && props.fetchState.total_cases) {
      recoveredRatio = parseFloat(props.fetchState.total_recovered.replace(/,/g, '')) / parseFloat(props.fetchState.total_cases.replace(/,/g, '')) * 100;
      recoveredRatio = (Math.round(recoveredRatio * 10) / 10).toFixed(1) + "%"; (Math.round(5.01 * 10) / 10).toFixed(1)
    } 
    let stateDeathRatio; 
    if (props.fetchState.death_cases && props.fetchState.cases_number) {
      stateDeathRatio = parseFloat(props.fetchState.death_cases.replace(/,/g, '')) / parseFloat(props.fetchState.cases_number.replace(/,/g, '')) * 100;
      stateDeathRatio = (Math.round(stateDeathRatio * 10) / 10).toFixed(1) + "%"; (Math.round(5.01 * 10) / 10).toFixed(1)
    }
    return (
        <div>
          {props.fetchState.activeSearch === "state" && 
            <div className="displayResultsContainer">
              <em>*State numbers not working correctly, DO NOT TRUST DATA</em>
              <h1>{props.fetchState.state_name}</h1>
              <small>Cases Updated{props.fetchState.record_date}</small>
              <br/>
              <small>Deaths Updated{props.fetchState.death_record_date}</small>
              <div className="resultsContainer">
                <div className="groupResults">
                  <Result data={numberWithCommas(props.fetchState.cases_number)} label="Total Cases" />
                  <Result data={numberWithCommas(props.fetchState.death_cases)} label="Total Deaths" />
                </div>
                <div className="groupResults">
                  <Result data={stateDeathRatio} label="Death Ratio" />
                </div>
              </div>
          </div>        
          }

          {props.fetchState.activeSearch === "country" && 
            <div className="displayResultsContainer">
              <h1>{props.fetchState.country_name}</h1>
              <small>{props.fetchState.record_date}</small>
              <div className="resultsContainer">
                <div className="groupResults">
                  <Result data={props.fetchState.total_cases} label="Total Cases" />
                  <Result data={props.fetchState.total_deaths} label="Total Deaths" />
                </div>
                <div className="groupResults">
                  <Result data={props.fetchState.active_cases} label="Active Cases" />
                  <Result data={props.fetchState.total_recovered} label="Total Recovered" />
                </div>
                <div className="groupResults">
                  <Result data={activeRatio} label="Active Ratio" />
                  <Result data={deathRatio} label="Death Ratio" />
                  <Result data={recoveredRatio} label="Recovered Ratio" />
                </div>
              </div>
            </div>
          }

        </div>
    )
}

export default DisplayResults;