import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type User from '../../types/User';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import './Profile.css';
import { useLoginContext } from '../../hooks/loginContext';
function Profile (): JSX.Element {
  const location: { state: { user: User } } = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;
  const { handleLogout } = useLoginContext();
  const performLogout = (): void => {
    handleLogout();
    navigate('/');
  };
  return <>
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100" >
        <MDBRow className="justify-content-center  h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <MDBIcon style = {{ cursor: 'pointer', paddingRight: '.25rem' }} far icon="edit mb-5" />
                  <MDBIcon onClick={performLogout} style = {{ cursor: 'pointer', paddingLeft: '.25rem' }} fas icon="sign-out-alt" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Personal Info</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Trainer</MDBTypography>
                        <MDBCardText className="text-muted">{user.trainer ?? 'No Trainer'}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Goals</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Current</MDBTypography>
                        <MDBCardText className="text-muted">{user.current_goals ?? 'Looking to start the journey!'}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Past</MDBTypography>
                        <MDBCardText className="text-muted">{user.past_goals ?? 'Still working towards the dream!'}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  </>;
}
export default Profile;
