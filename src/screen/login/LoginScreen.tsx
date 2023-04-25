/* eslint-disable @typescript-eslint/ban-ts-comment */
import logo from './../../logo.png';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardImage,
  MDBIcon,
  MDBRow,
  MDBCol
}
  from 'mdb-react-ui-kit';
import './LoginScreen.css';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import React from 'react';

import { useLoginContext } from '../../hooks/loginContext';
import { useNavigate } from 'react-router-dom';
function LoginScreen (): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  // @ts-expect-error
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

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form onSubmit={handleSubmit(onsubmit)}>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput id='form2' type='email'{...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i
                  })} placeholder='Email'/>
                  {(errors.email != null) && <span>This field is required and must be a valid email address</span>}

                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput
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

                <Button type="submit" size='sm'>Login</Button>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='4' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src={logo} fluid/>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <Button onClick={() => { navigate('/signup'); }} style={{
        alignContent: 'center'
      }}>New to the club?</Button>
    </MDBContainer>
  );
}
export default LoginScreen;
