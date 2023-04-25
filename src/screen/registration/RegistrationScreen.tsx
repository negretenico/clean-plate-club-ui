import logo from './../../logo.png';
import {
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
import './Registration.css';
import { type SubmitHandler, useForm, type FieldValues } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const onsubmit: SubmitHandler<Registration | FieldValues> = (data: Registration) => {
    axios.post('http://localhost:5000/api/users/signup', { name: data.name, email: data.email, password: data.password })
      .then((response) => {
        navigate('/', { state: data });
        console.log(response.data);
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

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registration</p>
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput {...register('name')} placeholder='Your Name' id='form1' type='text' className='w-100'/>
                </div>

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
                  <MDBInput placeholder='Repeat your password' id='form4' type='password' {...register('confirmpwd', {
                    required: true,
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return 'Your passwords do no match';
                      }
                    }
                  })} />
                  {(errors.confirmpwd != null) && <span>Your passwords do no match</span>}

                </div>

                <Button onClick={() => { setIsSubmitted(true); }} type="submit" size='sm'>Register</Button>
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
