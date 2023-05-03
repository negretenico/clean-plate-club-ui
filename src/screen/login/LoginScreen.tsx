/* eslint-disable @typescript-eslint/ban-ts-comment */
import logo from './../../logo.png';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardImage,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBBtn
}
  from 'mdb-react-ui-kit';
import './LoginScreen.css';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import React from 'react';

import { useLoginContext } from '../../hooks/loginContext';
import { useNavigate } from 'react-router-dom';
import { PINK } from '../../colors';
function LoginScreen (): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin } = useLoginContext();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const onsubmit: SubmitHandler<Registration | FieldValues> = (data: Registration) => {
    handleLogin(data);
    navigate('/');
  };
  return (
    <MDBContainer >
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody >
          <MDBRow >
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <h4 className="mt-1" style={{ color: PINK }}>Clean Plate Club</h4>
              <p>Please login to your account</p>

              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form onSubmit={handleSubmit(onsubmit)}>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput label='Email' id='form2' type='email'{...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i
                  })} placeholder='Email'/>
                  {(errors.email != null) && <span>This field is required and must be a valid email address</span>}

                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput

                    label='Password'
                    placeholder='Password'
                    id='form3'
                    type='password'
                    {...register('password', {
                      required: true
                    })
                    } />
                  {(errors.password != null) && <span>This field is required</span>}
                  <br></br>
                </div>
                <MDBBtn type='submit' className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
              </form>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">New to the club?</p>
                <MDBBtn onClick={() => { navigate('/signup'); }} outline className='mx-2' color='danger'>
                Sign up!
                </MDBBtn>
              </div>
            </MDBCol>

            <MDBCol md='10' lg='4' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src={logo} fluid/>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
export default LoginScreen;
