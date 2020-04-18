export default interface Symptons {
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
};