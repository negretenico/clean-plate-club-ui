import { Stack } from 'react-bootstrap';
import ControlledCarousel from '../../components/carousel/ControlledCarousel';
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useLoginContext } from '../../hooks/loginContext';
function Home (): JSX.Element {
  const navigate = useNavigate();
  const { isLoggedIn } = useLoginContext();
  return (
    <>
      <h1>You select, we perfect, you heat, bon appetit</h1>
      <MDBContainer fluid className="home_image_section" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/home/eating_stir_fry_back_ground.png)` }} >
        <MDBRow >
          <MDBCol md='4'>
            <Stack style={{ transform: 'translate(50%,55%)' }} gap={3}>
              <h2 className="home_header">{"Don't procrastinate any longer..."}</h2>
              <h6 className="home_sub_header">Commence your fitness journey today and relish the lasting results that extend far beyond a single season.</h6>
              <MDBBtn className="home_primary_button" rounded onClick={() => { navigate('/menu'); }}>Shop Meal Plans</MDBBtn>
              <MDBBtn outline color="dark"className="home_secondary_button" rounded onClick={() => { isLoggedIn ? navigate('/survey') : navigate('/login'); }}>Take the Quiz</MDBBtn>
            </Stack>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr/>
      <h1>Buying Clean Plate Club supports local food access and nutrition education.</h1>
      <MDBContainer>
        <MDBRow >
          <MDBCol md='4'>
            <br/>
            <p>
            Every purchase of a Clean Plate Club meal contributes $1
to Food Leads, a Columbus-based organization. Food
Leads is dedicated to empowering our community to build
nourishing relationships with food to reduce racial and
socioeconomic health disparities that contribute to chronic
disease. They do this through nutrition education programs
and their meal kit service to support neighbors with the
knowledge and the resources to eat a diabetic-friendly and
heart-healthy diet. Find out more about their work <a style= {{ cursor: 'pointer', color: 'blue' }} onClick={() => window.open('https://www.foodleads.net')}>here</a>
            </p>
          </MDBCol>
          <MDBCol>
            <img src="/food_leads.png" style={{ height: '26rem', width: '26rem' }}/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr/>
      <MDBContainer>
        <MDBRow>
          <h2 className="home_header">Real members. Real results.</h2>
          <p className="home_sub_header">Check out the amazing transformations achieved by Clean Plate Club members, and see how they transformed not only their bodies, but their lives too!</p>
          <ControlledCarousel/>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
export default Home;
