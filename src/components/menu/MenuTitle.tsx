import React, { useState } from 'react';
import { MDBCardTitle, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import type Meal from '../../types/MenuItem';
import formatCurrency from '../../formatCurrency';
import type MealPlanType from '../../types/MealPlanType';
function MenuTitle ({ item, handleFlip }: { item: Meal, handleFlip: () => void }): JSX.Element {
  return (
    <>
      <MDBCardTitle>
        <MDBRow>
          <MDBCol md='8'>
            {item.name}
            <MDBIcon onClick={handleFlip} color='secondary' className='ms-2' icon="question-circle" size='sm'/>
          </MDBCol>
          <MDBCol md='4'>
            {formatCurrency(item.cost)}
          </MDBCol>
        </MDBRow>
      </MDBCardTitle>
    </>
  );
}
export default MenuTitle;
