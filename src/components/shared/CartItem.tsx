import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../../hooks/shoppingContext';
import React from 'react';
import type Meal from '../../types/MenuItem';
import formatCurrency from '../../formatCurrency';
import '../../App.css';
interface CartItemProps {
  meal: Meal
  quantity: number
}

function CartItem ({ meal, quantity }: CartItemProps): JSX.Element {
  const { removeFromCart } = useShoppingCart();
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={`food/${meal.meal_id}.jpg`}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className="me-auto">
        <div>
          {meal.name}{' '}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatCurrency(meal.cost)}
        </div>
      </div>
      <div> {formatCurrency(meal.cost * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => { removeFromCart(meal.meal_id); }}
      >
        &times;
      </Button>
    </Stack>
  );
}
export default CartItem;
