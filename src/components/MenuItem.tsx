import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../hooks/loginContext';
import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardSubTitle, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdb-react-ui-kit';
import type Meal from '../types/MenuItem';
import { type backgroundColor } from 'mdb-react-ui-kit/dist/types/types/colors';
import './FlippingCard.css';
import QuantityAndAdd from './menu/QuantityAndAdd';
import MenuTitle from './menu/MenuTitle';
import { useShoppingCart } from '../hooks/shoppingContext';
function MenuItem ({ item }: { item: Meal }): JSX.Element {
  const { increaseCartQuantity, removeFromCart, cartItems } = useShoppingCart();
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();
  const onClickMap: Record<string, () => void> = {
    true: () => {
      navigate('/checkout', { state: { cartItems } });
    },
    false: () => {
      navigate('/login');
    }
  };
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = (): void => {
    setIsFlipped(!isFlipped);
  };
  const { isLoggedIn } = useLoginContext();
  const handleClick = (): void => {
    onClickMap[String(isLoggedIn)]();
  };
  const handleIncreaseClick = (): void => {
    setCount(count + 1);
    increaseCartQuantity(item);
  };
  const handleDecreaseClick = (): void => {
    if (count === 0) {
      return;
    }
    setCount(count - 1);
    removeFromCart(item.meal_id);
  };

  const macroColor: Record<string, backgroundColor> = {
    carbs: 'warning',
    fat: 'danger',
    protein: 'info'
  };
  return (<>
    <MDBCard className="flip-card-outer">
      <div className={isFlipped ? 'card-back' : 'card-front'} >
        <MDBCardImage src={`food/${item.meal_id}.jpg`} style={{ height: '420px', width: '100%' }} position='top' alt='...'/>
        <MenuTitle item={item} handleFlip={handleFlip}/>
        <MDBCardBody>
          <QuantityAndAdd count={count} handleIncreaseClick={handleIncreaseClick} handleDecreaseClick={handleDecreaseClick} handleClick={handleClick} />
        </MDBCardBody>
      </div>
      <div className={isFlipped ? 'card-front' : 'card-back'} onClick={handleFlip}>
        <MenuTitle item={item} handleFlip={handleFlip}/>
        <MDBCardBody>
          <MDBCardSubTitle>Ingredients</MDBCardSubTitle>
          <MDBListGroup>
            {
              item.ingredients.map((ingredient, index) => {
                return <MDBListGroupItem key={index}>{ingredient}</MDBListGroupItem>;
              })
            }
          </MDBListGroup>
          <MDBBadge color='success'>Calories {item.calories}</MDBBadge>
          {
            Object.entries(item.macros).map(([key, value]) => {
              return (<>
                <MDBBadge color={macroColor[key]} className='ms-2' pill>{key} {value}g</MDBBadge>
              </>);
            })
          }
          <QuantityAndAdd count={count} handleIncreaseClick={handleIncreaseClick} handleDecreaseClick={handleDecreaseClick} handleClick={handleClick} />
        </MDBCardBody>
      </div>
    </MDBCard>
  </>);
}
export default MenuItem;
