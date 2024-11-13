import React, { useState } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow, MDBTooltip } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
interface Props {
  count: number
  handleIncreaseClick: () => void
  handleDecreaseClick: () => void
  handleClick: () => void
}
function QuantityAndAdd ({ count, handleIncreaseClick, handleDecreaseClick, handleClick }: Props): JSX.Element {
  const buttonStyle = {
    width: '1.5rem',
    height: '1.5rem',
    margin: '5px',
    backgroundColor: 'rgb(230, 232, 233)',
    border: 'none', // Remove the border
    color: 'black'
  };
  const navigate = useNavigate();
  return (
    <MDBRow>
      <MDBCol md='8'>
        <MDBRow >
          <MDBCol size='6' md='2'>
            <MDBBtn style={buttonStyle} rounded className="d-flex align-items-center justify-content-center" onClick={handleDecreaseClick} >-</MDBBtn>
          </MDBCol>
          <MDBCol size='4' md='1' className="d-flex align-items-center justify-content-center">
            <span style={{ color: '#000000', textAlign: 'center', marginLeft: '10px' }}>
              {count}
            </span>
          </MDBCol>
          <MDBCol size='4' md='3'>
            <MDBBtn style={buttonStyle} rounded className="d-flex align-items-center justify-content-center" onClick={handleIncreaseClick}>+</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCol>
      <MDBCol size='6' md='4'>
        <MDBBtn className='primary-button' onClick={handleClick}>
          Add to Cart
          <MDBTooltip tag='a' title="Your purchase invests $1 in the health of your neighbors. Find out how">
            <MDBIcon onClick={(e: { stopPropagation: () => void }) => { e.stopPropagation(); navigate('/'); }} color='white' className='ms-2' icon="question-circle" size='sm'/>
          </MDBTooltip>
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  );
}
export default QuantityAndAdd;
