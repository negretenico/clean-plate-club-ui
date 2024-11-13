import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import { type NavigateFunction } from 'react-router-dom';
function CheckoutHeader ({ isOpen, handleToggle, navigate, textForNumberOfItems }:
{ isOpen: boolean, handleToggle: () => void, navigate: NavigateFunction, textForNumberOfItems: () => string }): JSX.Element {
  const styling = { color: '#FF0000' };
  return (
    <>
      <h1 className='text-center'>
        <div className="pop-over-container">
        Checkout {'('}
          <span className="a-color-link clickable-headingpop-over-trigger" onClick={handleToggle}>
            { textForNumberOfItems()}
          </span>
          {')'}
          {isOpen && (
            <div className="pop-over-content">
              <div className="pop-over-arrow"></div>
              <MDBBtn style={{ color: 'black', background: ' #e6e6e6', border: 'none' }} onClick={() => { navigate('/menu'); }}>Continue shopping?</MDBBtn>
              <MDBBtn className='primary-button' onClick={handleToggle}>Stay in checkout</MDBBtn>
            </div>
          )}
        </div>

      </h1>
    </>
  );
}
export default CheckoutHeader;
