import React, { Component, ChangeEvent, FormEvent } from 'react';
import './SymptonChecker.css';
import FormComponent from '../FormComponent/FormComponent';
import DemographicForm from '../DemographicForm/DemographicForm';
import Results from '../Results/Results';

interface Symptons {
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

interface State {
  symptons : {
    severeBreathing: boolean | undefined;
    severeFever: boolean | undefined;
    severePressure: boolean | undefined;
  
    cough: boolean | undefined;
    fever: boolean | undefined;
  
    travel: boolean | undefined;
    directContact: boolean | undefined;
    work: boolean | undefined;
  
    highBloodPressure: boolean | undefined;
    asthma: boolean | undefined;
    extremeObesity: boolean | undefined;
    heartProblems: boolean | undefined;

    highRiskAge: boolean | undefined;    

    [key: string]: boolean | undefined;
  },
  demographics: {
    age: string | null;
    country: string | null;
    municipality: string | null;
  },
  currentStep: number;
  formStepsLength: number;
}

class SymptonChecker extends Component<{}, State> {
  constructor(props: any){
    super(props);

    this.state = {
      symptons: {
        severeBreathing: undefined,
        severeFever: undefined,
        severePressure: undefined,
  
        cough: undefined,
        fever: undefined,
  
        travel: undefined,
        directContact: undefined,
        work: undefined,
  
        highBloodPressure: undefined,
        asthma: undefined,
        extremeObesity: undefined,
        heartProblems: undefined,

        highRiskAge: undefined,
      },
      demographics: {
        age: null,
        country: null,
        municipality: null,
      },
      currentStep: 0,
      formStepsLength: 0,
    }
  }
  currentForm = (formSteps: JSX.Element[]) => {
    return formSteps[this.state.currentStep];
  }
  next = () => {
    if (this.state.currentStep < 5) this.setState({currentStep: this.state.currentStep + 1});
  }
  back = () => {
    if (this.state.currentStep > 0) this.setState({currentStep: this.state.currentStep - 1});
  }
  onChangeSelect = (event: ChangeEvent<{}>, value: string | null, id:string) => {
    let demographics: {
      country: string | null;
      age: string | null;
      municipality: string | null;
      [key: string]: string | null;
    };
    demographics = this.state.demographics;
    demographics[id] = value;
    this.setState({
      demographics,      
    });
  }
  onChangeAge = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string):void => {
    let demographics: {
      country: string | null;
      age: string | null;
      municipality: string | null;
      [key: string]: string | null;
    };
    let highRiskAge: boolean | null = false;
    demographics = this.state.demographics;
    demographics[id] = e.target.value;
    if(parseInt(e.target.value) > 60 || parseInt(e.target.value) < 18) {
      highRiskAge=true;
    } else {
      highRiskAge=false;
    }
    let symptons: Symptons = this.state.symptons;

    symptons["highRiskAge"] = highRiskAge
    this.setState({
      demographics,      
      symptons,
    });  
  }
  onSubmitDemographics = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if(this.state.demographics.age && this.state.demographics.country){
      this.setState({currentStep: this.state.currentStep + 1});
    }
  }
  changeCheckbox = (e: ChangeEvent<HTMLInputElement>, id?:string) => {
    let symptons: Symptons = this.state.symptons;
    if (id) {
      symptons[id] = e.target.checked;
      this.setState({ symptons })
    } else {
      symptons["cough"] = false;
      symptons["fever"] = false;  
      if(e.target.value == "Both"){
        symptons["cough"] = true;
        symptons["fever"] = true;        
      } else if (e.target.value !== "None") {
        symptons[e.target.value] = true;
      } else {
        symptons["cough"] = false;
        symptons["fever"] = false;  
      }
      this.setState({ symptons })
    }
  }
  getRiskAge = () => {
    if(this.state.symptons.highRiskAge !== null){
      return this.state.symptons.highRiskAge ? "High risk age" : "No risk age";
    }
  }
  getSymptonValue = ():string => {
    if(this.state){
      if(this.state.symptons.fever && this.state.symptons.cough){
        return "Both";
      } else if (this.state.symptons.fever) {
        return "Fever";
      } else if (this.state.symptons.cough) {
        return "Cough";
      } else {
        return "None";
      }
    } else {
      return "";
    }
  }
  getSymptonsState = ():Symptons | undefined => {
    if(this.state){
      return this.state.symptons;
    } else {
      return undefined;
    }
  }
  render() {
    const formSteps: JSX.Element[] = [
      <DemographicForm 
        // inputs={["age", "country", "municipality"]}
        title={"Demographics"}
        description={"Put your name and description so we know who u are"}
        onChangeSelect={this.onChangeSelect}
        onChangeAge={this.onChangeAge}
        onSubmitDemographics={this.onSubmitDemographics}
        autocompleteVal={this.state.demographics.country}
        ageVal={this.state.demographics.age}
      />,
      <FormComponent 
        inputs={["severeBreathing", "severeFever", "severePressure"]}
        title={"Severe Symptons"}
        description={"Are you experiencing any of these"}
        multiple={true}
        changeCheckbox={this.changeCheckbox}
        symptonValue={this.getSymptonValue()}
        symptonsState={this.state.symptons}
       />,
      <FormComponent 
        inputs={["cough", "fever"]}
        title={"Symptons"}
        description={"Do you have any of this"} 
        changeCheckbox={this.changeCheckbox}
        symptonValue={this.getSymptonValue()}
      />,
      <FormComponent 
        inputs={["travel", "directContact", "work"]}
        title={"Contact"}
        description={"Have you been in contact"}
        changeCheckbox={this.changeCheckbox}
        multiple={true}
        symptonsState={this.state.symptons}
        symptonValue={this.getSymptonValue()}
        />,
      <FormComponent
        inputs={["highBloodPressure", "extremeObesity", "asthma", "heartProblems"]}
        title={"Preexisting conditions"}
        description={"Do you have any of these pre existing conditions?"} 
        changeCheckbox={this.changeCheckbox}
        multiple={true}
        symptonsState={this.state.symptons}
        symptonValue={this.getSymptonValue()}
        />,
      <Results symptons={this.state.symptons} />
    ];
    let { severeBreathing, severeFever, severePressure, cough, fever, travel, directContact, work, highBloodPressure, asthma, extremeObesity, heartProblems, highRiskAge } = this.state.symptons;
    return (
      <div>
        <div className="SymptonChecker-next-container">
          <span><a href="#" onClick={this.back}>Back</a></span><span><a href="#" onClick={this.next}>Next</a></span>
        </div>
        <div className="SymptonChecker-submitted-data">
          <span>{this.state.demographics.country}</span>
          <span>{this.state.demographics.age}</span>
          <span>{this.getRiskAge()}</span>
          <span>{cough && "Patient has cough"}</span>
          <span>{fever && "Patient has fever"}</span>
          <span>{severeBreathing && "Patient has severeBreathing"}</span>
          <span>{severeFever && "Patient has severeFever"}</span>          
          <span>{severePressure && "Patient has severePressure"}</span>
        </div>
        {this.currentForm(formSteps)}
      </div>
    )
  }
}

export default SymptonChecker;
