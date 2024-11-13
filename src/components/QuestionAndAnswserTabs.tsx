import type Question from '../types/Question';
import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
function QuestionAndAnswerTabs ({ questions }: { questions: Question[] }): JSX.Element {
  const [verticalActive, setVerticalActive] = useState(questions[0].question ?? '');

  const handleVerticalClick = (value: string): void => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  return (
    <>
      <MDBRow>
        <MDBCol size='3'>
          <MDBTabs className='flex-column text-center'>
            {
              questions.map((question) => {
                return (
                  <>
                    <MDBTabsItem>
                      <MDBTabsLink onClick={() => { handleVerticalClick(question.question); }} active={verticalActive === question.question}>
                        {question.question}
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </>
                );
              })
            }
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>

          <MDBTabsContent>
            {
              questions.map((question) => {
                return (
                  <MDBTabsPane key={question.question} show={verticalActive === question.question}>
                    <h5>{question.question}</h5>
                    {question.answer}
                  </MDBTabsPane>
                );
              })
            }
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default QuestionAndAnswerTabs;
