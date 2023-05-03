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
import './Registration.css';
import { type SubmitHandler, useForm, type FieldValues } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PINK } from '../../colors';
import { useLoginContext } from '../../hooks/loginContext';

const usePasswordValidation = (password: string): boolean => {
  const [validPassword, setValidPassword] = useState<boolean>(false);

  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    const isValid = passwordRegex.test(password);
    setValidPassword(isValid);
  }, [password]);

  return validPassword;
};
function RegistrationScreen (): JSX.Element {
  const navigate = useNavigate();
  const { handleLogin } = useLoginContext();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const onsubmit: SubmitHandler<Registration | FieldValues> = (data: Registration) => {
    axios.post('http://localhost:5000/api/users/signup', { name: data.name, email: data.email, password: data.password })
      .then((response) => {
        handleLogin(data);
        navigate('/', { state: data });
      }).catch((error) => {
      // handle error
        if ((Boolean(error.response)) && error.response.status === 500) {
          console.log('Internal Server error');
          navigate(0);
        }
        navigate('/duplicateemail', { state: data });
      });
  };
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validPassword = usePasswordValidation(password);
  return (
    <MDBContainer >

      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody >
          <MDBRow >
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <h4 className="mt-1" style={{ color: PINK }}>Clean Plate Club</h4>
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput label='Name' {...register('name')} placeholder='Your Name' id='form1' type='text' className='w-100'/>
                </div>

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
                    value={password}
                    placeholder='Password'
                    id='form3'
                    type='password'
                    {...register('password', {
                      required: true
                    })
                    }
                    onChange={(e) => { setPassword(e.target.value); }} />
                  {(errors.password != null) && <span>This field is required</span>}
                  <br></br>
                  {!validPassword && (Boolean(password)) && isSubmitted && <span>Password must contain at least one uppercase letter, one special character, one digit, one lowercase letter, and be at least six characters long</span>}

                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg'/>
                  <MDBInput label='Repeat Password' placeholder='Repeat your password' id='form4' type='password' {...register('confirmpwd', {
                    required: true,
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return 'Your passwords do no match';
                      }
                    }
                  })} />
                  {(errors.confirmpwd != null) && <span>Your passwords do no match</span>}

                </div>

                <MDBBtn type='submit' className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
              </form>
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

export default RegistrationScreen;
