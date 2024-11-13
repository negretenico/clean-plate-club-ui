import { Model, StylesManager } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { surveyJSON } from './survey_json';
import React, { createContext } from 'react';
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

function SurveyComponent (): JSX.Element {
  const survey = new Model(surveyJSON);
  survey.onComplete.add((sender, options) => {
    localStorage.setItem('requestBody', JSON.stringify(sender.data));
  });
  return (
    <>
      <MDBContainer fluid >
        <Survey model={survey} />
      </MDBContainer>
    </>
  );
}
export default SurveyComponent;
