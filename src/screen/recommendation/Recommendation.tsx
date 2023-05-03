import { Card, CardGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBContainer, MDBRow, MDBSpinner } from 'mdb-react-ui-kit';
import axios from 'axios';
import type MealPlanType from '../../types/MealPlanType';
import MenuTitle from '../../components/menu/MenuTitle';
import formatCurrency from '../../formatCurrency';
import './Recommendation.css';
import QuantityAndAdd from '../../components/menu/QuantityAndAdd';
import { useShoppingCart } from '../../hooks/shoppingContext';
import { useLoginContext } from '../../hooks/loginContext';
import { useNavigate } from 'react-router-dom';
import type Meal from '../../types/MenuItem';
function Recommendation (): JSX.Element {
  const [mealPlans, setMealPlans] = useState<MealPlanType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { increaseCartQuantity, removeFromCart, cartItems } = useShoppingCart();
  const [meals, setMeals] = useState<Meal[]>([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/meals')
      .then((res) => {
        setMeals(res.data);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:5000/api/mealplans')
      .then((res) => {
        setMealPlans(res.data);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }, []);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [count, setCount] = useState<Record<string, number>>({});
  const handleIncreaseClick = (mealPlan: MealPlanType): void => {
    const mealMap = meals.reduce<Record<string, Meal>>((acc, meal) => {
      acc[meal.meal_id] = meal;
      return acc;
    }, {});
    setCount({ ...count, [mealPlan.id]: ((Boolean(count[mealPlan.id])) && count[mealPlan.id] !== 0) ? count[mealPlan.id] + 1 : 1 });
    mealPlan.meals.forEach((meal) => {
      console.log(meal);
      increaseCartQuantity(mealMap[meal]);
    });
  };
  const handleDecreaseClick = (mealPlan: MealPlanType): void => {
    if (count[mealPlan.id] === 0) {
      return;
    }
    setCount({ ...count, [mealPlan.id]: ((Boolean(count[mealPlan.id])) && count[mealPlan.id] !== 0) ? count[mealPlan.id] - 1 : 0 });
    mealPlan.meals.forEach((meal) => {
      removeFromCart(meal);
    });
  };
  const navigate = useNavigate();
  const { isLoggedIn } = useLoginContext();
  const onClickMap: Record<string, () => void> = {
    true: () => {
      navigate('/checkout', { state: { cartItems } });
    },
    false: () => {
      navigate('/login');
    }
  };
  const handleClick = (): void => {
    onClickMap[String(isLoggedIn)]();
  };
  return (
    <>
      <MDBContainer >
        {
          isLoading
            ? <MDBSpinner />
            : <><MDBRow>
              <h2 style={{ textAlign: 'left', fontSize: '2.25rem' }}>Discover a meal plan that caters to your lifestyle needs!</h2>
              <span style={{ textAlign: 'left', fontSize: '1.25rem', marginTop: '1rem' }}>
              Experience convenience with our carefully curated Chef-selected menu that is guaranteed to keep your taste buds entertained. Our meal plans are meticulously designed with your goals in mind and are well-balanced with macros and nutrition to help you achieve them.
              </span>
            </MDBRow>
            <MDBRow style={{ marginTop: '2rem' }} className="g-3">
              {mealPlans.map((mealPlan, index) => {
                return (
                  <MDBCol md="4" key={mealPlan.id}>
                    <MDBCard onMouseEnter={() => { setHoveredCardIndex(index); }}
                      onMouseLeave={() => { setHoveredCardIndex(null); }}className={`card-${hoveredCardIndex === index ? 'hovered' : 'unhovered'}`}>
                      <MDBCardImage src={`mealplans/${mealPlan.id}.jpg`} style={{ height: '420px', width: '100%' }} position='top' alt='...' />
                      <MDBCardTitle>
                        <MDBRow>
                          <MDBCol md='7'>
                            {mealPlan.name}
                          </MDBCol>
                          <MDBCol md='5'>
                            {formatCurrency(Number(mealPlan.cost))}
                          </MDBCol>
                        </MDBRow>
                      </MDBCardTitle>
                      <MDBCardBody>
                        {mealPlan.description}
                      </MDBCardBody>
                      <QuantityAndAdd count={count[mealPlan.id] ?? 0} handleIncreaseClick={() => { handleIncreaseClick(mealPlan); }} handleDecreaseClick={() => { handleDecreaseClick(mealPlan); }} handleClick={handleClick} />

                    </MDBCard>
                  </MDBCol>
                );
              })}
            </MDBRow></>
        }
      </ MDBContainer>
    </>);
}
export default Recommendation;
