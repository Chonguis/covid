import React from 'react'
import './SubmittedFormPanel.css';
import FetchStateInterface from '../../interfaces/FetchStateInterface.interface';
import DisplayResults from '../DisplayResults/DisplayResults';

interface Props {
    formState: {
        country: string;
        state: string;
    } | null;
}

class SubmittedFormPanel extends React.Component<Props, FetchStateInterface> {
  constructor(props: any){
    super(props);
    // latest_stat_by_country[0].total_cases new_cases active_cases total_death new_deaths total_recovered total_cases_per1m record_date 
    this.state = {
      activeSearch: "",

      state_name: undefined,
      cases_number: undefined,
      cases_record_date: undefined,
      death_cases: undefined,
      death_record_date: undefined,

      country_name: undefined,
      total_cases: undefined,
      new_cases: undefined,
      active_cases: undefined,
      total_deaths: undefined,
      new_deaths: undefined,
      total_recovered: undefined,
      total_cases_per1m: undefined,
      record_date: undefined,
    };
  }

  componentWillReceiveProps(nextProps: Props){
    if(nextProps.formState){
      if (JSON.stringify(this.props) !== JSON.stringify(nextProps.formState)) {
        const { state, country } = nextProps.formState;
        if (nextProps.formState.state) {
          fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/johns_hopkins_latest_usa_statistic_by_state.php?state=${state}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "4781cadd8fmsh5bf0d6baa331ad3p1ab429jsnb80237845be3"
            }
          })
            .then(res => {
                res.json().then(data => {
                    console.log(data);
                    if(data.usa_cases_by_state.length === 0 && data.usa_deaths.length === 0){
                      alert("No results");
                      return;
                    } else {
                      this.setState({
                        activeSearch: "state",

                        state_name: data.usa_cases_by_state[0].state_name,
                        cases_number: data.usa_cases_by_state[0].cases_number,
                        cases_record_date: data.usa_cases_by_state[0].record_date,
                        death_cases: data.usa_deaths[0].death_cases,
                        death_record_date: data.usa_deaths[0].record_date,
                      })
                    }
                })
            })
            .catch(err => {
                console.log(err);
            });
        } else {
          fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "4781cadd8fmsh5bf0d6baa331ad3p1ab429jsnb80237845be3"
            }
          })
            .then(res => {
              res.json().then(data => {
                console.log(data);
                if (data.latest_stat_by_country.length === 0) {
                  alert("No results");
                  return;
                } else {
                  let latest_stats = data.latest_stat_by_country[0];
                  console.log('latest', latest_stats.total_deaths, typeof latest_stats.total_deaths);
                  this.setState({
                    activeSearch: "country",

                    total_cases: latest_stats.total_cases,
                    new_cases: latest_stats.new_cases,
                    active_cases: latest_stats.active_cases,
                    total_deaths: latest_stats.total_deaths,
                    new_deaths: latest_stats.new_deaths,
                    record_date: latest_stats.record_date,
                    total_cases_per1m: latest_stats.total_cases_per1m,
                    total_recovered: latest_stats.total_recovered,
                    country_name: latest_stats.country_name,
                  })
                }
              })
            })
            .catch(err => {
                console.log(err);
            });
        }
      }
    }
  }

  render(){

      return (
          <div className="tableContainer">
              <DisplayResults fetchState={this.state} />
          </div>
      )
  }
}


export default SubmittedFormPanel;