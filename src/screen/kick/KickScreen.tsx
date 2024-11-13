import React, { useState, useEffect } from 'react';
import MarkdownComponenet from '../../components/shared/MarkdownComponent';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBSpinner, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import type MealPlanType from '../../types/MealPlanType';
import axios from 'axios';
import formatCurrency from '../../formatCurrency';
import './KickScreen.css';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../hooks/loginContext';
function KickScreen (): JSX.Element {
  const { user } = useLoginContext();
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState<MealPlanType>({
    name: '',
    cost: '',
    description: '',
    id: '',
    meals: []

  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
    type gender = 'MALE' | 'FEMALE'
    type fitnesGoal = 'FAT_LOSS' | 'GENERAL_HEALTH' | 'MUSCLE_GAIN';
    interface macro {
      calories: number | string
      protein: number | string
      carbs: number | string
      fat: number | string
    }
    type goalMap = {
      [gen in gender]: {
        [fintes in fitnesGoal]: macro
      }
    }
    const goals: goalMap = {
      FEMALE: {
        FAT_LOSS: { calories: 870, protein: 90, carbs: 60, fat: 30 },
        GENERAL_HEALTH: { calories: 960, protein: 75, carbs: 75, fat: 40 },
        MUSCLE_GAIN: { calories: 905, protein: 90, carbs: 80, fat: 30 }
      },
      MALE: {
        FAT_LOSS: { calories: 1450, protein: 175, carbs: 120, fat: 30 },
        GENERAL_HEALTH: { calories: 1435, protein: 140, carbs: 140, fat: 35 },
        MUSCLE_GAIN: { calories: 1480, protein: 175, carbs: 150, fat: 30 }
      }
    };
    const [data, setData] = useState<{ gender: gender, goals: fitnesGoal }>({ gender: 'FEMALE', goals: 'FAT_LOSS' });
    const imageMap: Record<fitnesGoal, string> = {
      FAT_LOSS: 'fat_loss.png',
      GENERAL_HEALTH: 'general_health.png',
      MUSCLE_GAIN: 'muscle_gain.png'
    };
    useEffect(() => {
      const requestBody = JSON.parse(localStorage.getItem('requestBody') ?? '{}');
      setData(requestBody);
    }, []);
    return (
      <>{ <MDBContainer className="mb-3">
        <br/>
        <MDBRow>
          <MDBCol>
            <MDBCard title={data.goals.replace(/([A-Z])([A-Z]+)(_)?/g, ' $1$2').trim().replace(/([A-Z])/g, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase())} onClick={() => { navigate('/menu'); }} >
              <MDBCardImage src={`/${imageMap[data.goals]}`} style={{ height: '420px', width: '100%' }} position='top' alt='...' />
              <MDBCardTitle>
                <MDBRow>
                  <MDBCol >
                    {`${user.name}, we recommend`}
                  </MDBCol>
                </MDBRow>
              </MDBCardTitle>
              <MDBCardBody>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th scope='col'>Macro</th>
                      <th scope='col'>Amount</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {
                      Object.entries(goals[data.gender][data.goals]).map(([key, value]) => {
                        return (
                          <tr key={key}>
                            <th scope='row'>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                            <th>{value} {key === 'calories' ? 'kCal' : 'g'}</th>
                          </tr>);
                      })
                    }
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>

            </MDBCard>
          </MDBCol>
          <MDBCol>
            <div>
              <h4 style={{ fontSize: '3rem' }}> Confused about what you should be eating when it comes to your health and fitness goals?</h4>
              <p style={{ fontSize: '1.6rem', lineHeight: '1.6rem' }}>
            Leave the planning, shopping, and cooking to us. With our science-backed meal plans, you can sit back and enjoy delicious, healthy meals that match your needs and goals. No more guessing what to eat
              </p>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className='mb-3'>
          <h3>Why join the Club? </h3>
          <MDBCol>
            <MDBCard style={{ height: '200px' }}>
              <MDBCardBody>
                <div className='why-join-icon'>
                  <i className="fas fa-heart-pulse"></i>
                </div>
                <h5> Enhance Your Overall Health with Improved Nutrition</h5>
                <p>Receive expertly crafted, scientifically-backed meals that are packed with essential nutrients.</p>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard style={{ height: '200px' }}>
              <MDBCardBody>
                <div className='why-join-icon'>
                  <i className="fas fa-heart-pulse"></i>
                </div>
                <h5>Save Time and Money</h5>
                <p>Save time and money by letting us handle the planning, shopping, and cooking for you!</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard style={{ height: '200px' }}>
              <MDBCardBody>
                <div className='why-join-icon'>
                  <i className="fas fa-square-poll-horizontal"></i>
                </div>
                <h5>Achieve Your Goals</h5>
                <p>Achieve your health and fitness goals and say goodbye to diet failure with our expertly curated meal plans. Get ready to be in the best shape of your life.</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      }
      </>
    );
}
export default KickScreen;
