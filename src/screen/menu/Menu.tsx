import useMd from '../../hooks/useMd';
import MarkdownComponenet from '../../components/shared/MarkdownComponent';
import menu from './menu.md';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItem from '../../components/MenuItem';
import { Row, Spinner } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import type Meal from '../../types/MenuItem';
import './Menu.css';
function Menu (): JSX.Element {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios.get('http://localhost:5000/api/meals')
      .then((res) => {
        setMeals(res.data);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <MDBContainer >
        {
          isLoading
            ? <Spinner />
            : <MDBRow className="g-3">
              {
                meals.map((meal) => {
                  return (
                    <MDBCol md="4" key={meal.meal_id}>
                      <MenuItem item={meal} />
                    </MDBCol>
                  );
                })
              }
            </MDBRow>
        }
      </ MDBContainer>
    </>
  );
}
export default Menu;
