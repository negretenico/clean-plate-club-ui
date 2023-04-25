import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { surveyJSON } from './survey_json';
import React, { createContext } from 'react';

export const SurveyContext = createContext({});
function SurveyComponent (): JSX.Element {
  const survey = new Model(surveyJSON);
  survey.onComplete.add((sender, options) => {
    localStorage.setItem('requestBody', JSON.stringify(sender.data));
  });
  return (<Survey model={survey} />);
}
export default SurveyComponent;
