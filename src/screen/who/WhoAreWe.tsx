import { MDBCard, MDBCardBody, MDBCardImage, MDBCardSubTitle, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRipple, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import { BLUE, ORANGE, PINK } from '../../colors';
import { useNavigate } from 'react-router-dom';
import { Stack } from 'react-bootstrap';
import './WhoAreWe.css';
function WhoAreWe (): JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <MDBContainer fluid style={{ backgroundColor: BLUE }}>
        <MDBRow>
          <h2 style={{ color: ORANGE }}>
              We are the Clean Plate Club
          </h2>
        </MDBRow>
        <MDBRow>
          <MDBCol md= '2'></MDBCol>
          <MDBCol md='3'>
            <img src='/who/logo.png' alt="logo" height = '420px' width='420px'/>
          </MDBCol>
          <MDBCol md = '3'>
            <div style={{ transform: 'translate(0%, 20%)' }}>
              <h2 style={{ color: ORANGE }}>Our story</h2>
              <h4 style={{ color: '#FFFFFF' }}>We aim to provide To proivde high quality meals and tailored programming to individuals looking to make the most out of their exercise routines and establish healthier eating habits resulting in a lifestyle change.</h4>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="animated-wave" aria-hidden="true">
        <div className="animated-wave__wrapper">
          <div className="animated-wave__wave"></div>
        </div>
      </div>
      <MDBContainer>
        <MDBRow >
          <MDBCol>
            <div style={{ transform: 'translate(-20%, 50%)' }}>
              <h2 >How?</h2>
              <Stack direction='horizontal' gap={3}>
                <p>
                Services that include bio feedback assessing. This includes, but is not limited to, meal plans, consult/coach access, and customized training programs to keep you aligned with your goals.
                </p>
                <MDBIcon style={{ cursor: 'pointer' }} title="Take our survey" onClick={() => { navigate('/survey'); }}color='secondary' className='ms-2' icon="question-circle" size='lg'/>
              </Stack>
            </div>
          </MDBCol>
          <MDBCol>
            <img style={{ borderRadius: '.5rem' }} src='/who/coaching.jpg' alt="coaching" height = '420px' width='420px'/>
          </MDBCol>
        </MDBRow>
        <MDBRow >
          <MDBCol>
            <img style={{ transform: 'translate(-30%, 00%)', borderRadius: '.5rem' }} src='/who/lifetime.jpg' alt="coaching" height = '420px' width='420px'/>
          </MDBCol>
          <MDBCol>
            <div style={{ transform: 'translate(0%, 80%)' }}>
              <h2>Who?</h2>
              <Stack direction='horizontal' gap={3}>
                <p>
                Members of the club and/ or clients of trainers who are struggling or need guidance through the nutrition phase of their programming. Members who are trying to get a better handle on nutrition can also benefit from these services as well                </p>
              </Stack>
            </div>
          </MDBCol>
        </MDBRow>
        {/* <MDBRow center>
          <h3>
            Getting a plan of action established to master daily habits. With that, we will address and manage Resistance training, conditioning, improvement of metabolic function, stress, and nutritional structure. Ceating consistency in these areas will not only improve teh likelihood of sucess, but also encourage a healthier way of lie.
          </h3>
        </MDBRow> */}
        <hr/>
        <MDBRow>
          <h3>
            Meet our Leadership
          </h3>
        </MDBRow>
        <MDBRow center>
          <MDBCol md='4'>
            <MDBCard>
              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage src='/who/brian.jpg' fluid alt='...' />
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>
                Brian Davis
                </MDBCardTitle>
                <MDBCardSubTitle>
                CEO & Founder
                </MDBCardSubTitle>
                <MDBCardText>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra orci sagittis eu volutpat odio facilisis mauris. Elementum facilisis leo vel fringilla est. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Cras adipiscing enim eu turpis egestas pretium aenean.
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
export default WhoAreWe;
