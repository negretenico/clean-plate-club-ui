import { useLocation } from 'react-router-dom';
import { BsExclamationTriangle } from 'react-icons/bs';
import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardHeader
} from 'mdb-react-ui-kit';
import './DuplicateEmailScreen.css';
import MarkdownComponenet from '../../components/shared/MarkdownComponent';
import useMd from '../../hooks/useMd';
import type Registration from '../../types/Registration';
function DuplicateEmailScreen (): JSX.Element {
  const location: { state: Registration } = useLocation();
  const { email } = location.state;
  console.log(email);
  return <>
    <MDBContainer fluid>
      <MDBRow center >
        <MDBCol md={'4'}>
          <MDBCard border='0px'>
            <MDBCardTitle style={{
              textAlign: 'center'
            }}>Clean Plate Club</MDBCardTitle>
            <MDBCardBody>
              <MDBCard shadow='0' border='warning' background='white' className='mb-3'>
                <MDBRow>
                  <MDBCol start md={'1'}>
                    <BsExclamationTriangle size={'25px'} color='rgb(255,193,7}'/>
                  </MDBCol>
                  <MDBCol md={'11'}>
                    <MDBCardTitle style={{
                      color: 'rgb(255,193,7}'
                    }}>Email address already in use
                    </MDBCardTitle>
                    <MDBCardBody>
                      <p>{'You indicated you\'re a new customer, but an account already exists with the email address'}</p>
                      <span style={{ fontWeight: 'bold' }}>{email}</span>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
              <MDBCardText>
                <h5>Are you a returning customer?</h5>
                <a href='/login'>Sign-in</a>
                <h5>New to the club?</h5>
                <p>Create a new account with <a href='/signup'>a different e-mail address </a></p>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </>;
}
export default DuplicateEmailScreen;
