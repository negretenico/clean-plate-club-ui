import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import {surveyJSON} from './survey_json'
import {createContext} from 'react';
export const SurveyContext = createContext({});
function SurveyComponent(){
    const survey = new Model(surveyJSON);
    survey.onComplete.add((sender, options) => {
        localStorage.setItem('requestBody', JSON.stringify(sender.data));
    });
    return (<Survey model={survey} />);
}
export default SurveyComponent;