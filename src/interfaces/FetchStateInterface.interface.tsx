interface State {
    activeSearch: string;
  
    state_name: string | undefined;
    cases_number: string | undefined;
    cases_record_date: string | undefined;
    death_cases: string | undefined;
    death_record_date: string | undefined;

    country_name: string | undefined;
    total_cases: string | undefined;
    new_cases: string | undefined;
    active_cases: string | undefined;
    total_deaths: string | undefined;
    new_deaths: string | undefined;
    total_recovered: string | undefined;
    total_cases_per1m: string | undefined;
    record_date: string | undefined;
};

export default State;