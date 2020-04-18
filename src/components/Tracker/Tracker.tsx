import React, { FormEvent } from 'react';
import './Tracker.css';
import Form from '../Form/FormContainer';
import SubmittedFormPanel from '../SubmittedFormPanel/SubmittedFormPanel';

interface FormState {
  country: string;
  state: string;
}

interface State {
  submitted: boolean;
  formState: FormState;
}

class Tracker extends React.Component<{}, State> {
  constructor(props: any){
    super(props);

    this.state = {
      submitted: false,
      formState: {
        country: '',
        state: '',      
      },
    }
  }

  onSubmitForm = (e: FormEvent<HTMLFormElement>, formState: {country: string; state: string;}) => {
    e.preventDefault();
    console.log('formstate', formState)
    this.setState({
      submitted: true,
      formState: formState,
    });
    console.log(formState, 'formState');
  } 
  render(){
    let other = false;
    if(this.state.formState.state === "other" || this.state.formState.country === "other"){
      other = true;
    }
    return (
        <div className="Tracker-body">
          {Object.keys(this.state.formState) && <SubmittedFormPanel formState={!other ? this.state.formState : null} />}
          <Form onSubmitForm={this.onSubmitForm} submitted={this.state.submitted} />
        </div>
    );
  }
}

export default Tracker;
