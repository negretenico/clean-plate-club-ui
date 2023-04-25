import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../hooks/loginContext';
import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import type Meal from '../types/MenuItem';
function MenuItem ({ item }: { item: Meal }): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();
  const onClickMap: Record<string, () => void> = {
    true: () => {
      console.log('adding item to the cart');
    },
    false: () => {
      navigate('/login');
    }
  };
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = (): void => {
    setIsFlipped(!isFlipped);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { isLoggedIn } = useLoginContext();
  const handleClick = (): void => {
    onClickMap[isLoggedIn]();
  };
  const handleIncreaseClick = (): void => {
    setCount(count + 1);
  };
  const handleDecreaseClick = (): void => {
    setCount(count - 1);
  };
  return (<>
    <MDBCard className={`flipping-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-front" onClick={handleFlip}>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...'/>
        <MDBCardBody>
          <MDBCardTitle>{item.name}</MDBCardTitle>
          <MDBIcon fas icon="info-circle" />
          <MDBRow>
            Quantity
            <MDBBtn onClick={handleDecreaseClick} >-</MDBBtn>
            {count}
            <MDBBtn onClick={handleIncreaseClick}>+</MDBBtn>
          </MDBRow>
          <MDBBtn onClick={handleClick}>Add to Cart</MDBBtn>
        </MDBCardBody>
      </div>
      <div className="card-back" onClick={handleFlip}>
        <MDBCardBody>
          <MDBCardText>{item.ingredients}</MDBCardText>
        </MDBCardBody>
        Ingredients
        {item.ingredients}
        <MDBBadge color='success' light>Calories {item.calories}</MDBBadge>
        {
          Object.entries(item.macros).map(([key, value]) => {
            return (<>
              <MDBBadge color='success' light>{key} {value}g</MDBBadge>
            </>);
          })
        }
      </div>
    </MDBCard>
  </>);
}
export default MenuItem;
