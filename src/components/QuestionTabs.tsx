import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import type Question from '../types/Question';
import QuestionAndAnswerTabs from './QuestionAndAnswserTabs';

function QuestionTabs ({ questions }: { questions: Question[] }): JSX.Element {
  const [basicActive, setBasicActive] = useState<string>(questions[0].category ?? '');

  const handleBasicClick = (value: string): void => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  const categories = [...new Set(questions.map((question) => question.category))].sort();

  return (
    <>
      <MDBTabs>
        {
          categories.map((category) => {
            return (
              <MDBTabsItem key={category}>
                <MDBTabsLink style={{
                  color: 'black !important'
                }} onClick={() => { handleBasicClick(category); }} active={basicActive === category}>
                  {category}
                </MDBTabsLink>
              </MDBTabsItem>
            );
          })
        }
      </MDBTabs>

      <MDBTabsContent>
        {
          categories.map((category) => {
            return (
              <MDBTabsPane key={category} show={basicActive === category}>
                <QuestionAndAnswerTabs questions={questions.filter((question) => question.category === category)} />
              </MDBTabsPane>
            );
          })
        }
      </MDBTabsContent>
    </>
  );
}

export default QuestionTabs;
