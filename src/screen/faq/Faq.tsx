import useMd from '../../hooks/useMd';
import MarkdownComponenet from '../../components/shared/MarkdownComponent';
import faq from './faq.md';
import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import './Faq.css';
import { Stack } from 'react-bootstrap';
import type Question from '../../types/Question';
import axios from 'axios';
import QuestionTabs from '../../components/QuestionTabs';
function Faq (): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {
        loading
          ? <MDBSpinner></MDBSpinner>
          : <MDBContainer>
            <MDBRow className='mb-3'>
              <MDBCard>
                <h2 className='faq'>Frequently Asked Questions</h2>
                <QuestionTabs questions={questions} />
              </MDBCard>
            </MDBRow>
            <MDBRow className='mb-3'>
              <MDBCard>
                <h2 className='contact-us'>Getting in Touch with Us</h2>
                <p>{"If you have any remaining questions, don't worry! You can reach out to us directly via phone, or email and we'll be happy to provide you with the help you need."}</p>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol>
                      <MDBCard>
                        <MDBCardBody>
                          <div className='contact-icon'>
                            <MDBIcon fas icon="phone" />
                          </div>
                          <h5 className='contact-item-title'>Call Us</h5>
                          <p className='contact-item'>Phone:<br/> (313) 585 8717</p>
                          <MDBBtn href="tel:3135858717" className='primary-button'>
                       Call Now
                          </MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol>
                      <MDBCard>
                        <MDBCardBody>
                          <div className='contact-icon'>
                            <MDBIcon fas icon="envelope" />
                          </div>
                          <h5 className='contact-item-title'>Email Us</h5>
                          <p className='contact-item'>Email:<br/> cleanplateclub@gmail.com</p>
                          <MDBBtn className='primary-button' href="mailto:cleanplateclub@gmail.com" >
                       Email Now
                          </MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBContainer>
      }
    </>
  );
}
export default Faq;
