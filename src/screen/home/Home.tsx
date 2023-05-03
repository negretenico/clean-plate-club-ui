import { Stack } from 'react-bootstrap';
import ControlledCarousel from '../../components/carousel/ControlledCarousel';
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
function Home (): JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <h1>You select, we perfect, you heat, bon appetit</h1>
      <MDBContainer fluid className="home_image_section" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/home/eating_stir_fry_back_ground.png)` }} >
        <MDBRow >
          <MDBCol md='4'>
            <Stack style={{ transform: 'translate(50%,55%)' }} gap={3}>
              <h2 className="home_header">{"Don't wait until it's too late ..."}</h2>
              <h6 className="home_sub_header">start working on your summer body today and enjoy the results all season long.</h6>
              <MDBBtn className="home_primary_button" rounded onClick={() => { navigate('/menu'); }}>Shop Meal Plans</MDBBtn>
              <MDBBtn outline color="dark"className="home_secondary_button" rounded onClick={() => { navigate('/survey'); }}>Take the Quiz</MDBBtn>
            </Stack>
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
