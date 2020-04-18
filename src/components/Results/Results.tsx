import React from 'react';
import Symptons from '../../interfaces/Symptons.interface';

interface Props {
  symptons: Symptons;
}

const getResults = (symptons: Symptons):JSX.Element => {
  let positiveSymptons: string[] = [];
  for (const key in symptons) {
    if (symptons[key]) {
      positiveSymptons.push(key)
    }
  }
  const symptonsPoints: {
    [key: string]: number;
  } = {
    severeBreathing: 5,
    severeFever: 5,
    severePressure: 5,

    cough: 1,
    fever: 1,

    travel: 1,
    directContact: 1,
    work: 1,

    highBloodPressure: 1,
    asthma: 1,
    extremeObesity: 1,
    heartProblems: 1,

    highRiskAge: 1,
  }

  let counter:number = 0;
  positiveSymptons.forEach(element => {
    counter += symptonsPoints[element];
  })

  let resultsText: string | undefined;
  if(counter >= 5){
    resultsText = "GO TO DOCTOR NOW - level HIGH";
  } else if (counter >= 2) {
    resultsText = "You should consult a doctor - level MEDIUM";
  } else if (counter == 1) {
    resultsText = "Watch your symptons - level LOW";
  } else {
    resultsText = "No symptons observed - level VERY LOW";
  }

  return <p>{resultsText}</p>
}

const Results:React.FC<Props> = ({ symptons }) => {
  return (
    <div>
      <h1>Results</h1>
      {getResults(symptons)}
    </div>
  )
}

export default Results
