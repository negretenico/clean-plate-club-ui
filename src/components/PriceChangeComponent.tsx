import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardSubTitle, MDBCardTitle, MDBCol, MDBContainer, MDBDropdown, MDBDropdownItem, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import { Form } from 'react-bootstrap';
import formatCurrency from '../formatCurrency';
function PriceChangeComponent ({ setDonationAmount }: { setDonationAmount: React.Dispatch<React.SetStateAction<number>> }): JSX.Element {
  const donationAmountOptions: number[] = [1, 5, 10, 20];
  return (
    <>
      <MDBCard>
        <MDBRow>
          <MDBCol md='4'>
            <MDBCardImage src='/food_leads.png' alt='Food Leads' fluid />
          </MDBCol>
          <MDBCol md='8'>
            <MDBCardTitle>Make a Donation</MDBCardTitle>
            <MDBCardSubTitle>
            We are so excited you are making an investment in your health!
Invest in the health of your neighbors by adding a donation to your purchase.
By donating to Food Leads, you will support diabetes management, health
coaching, and food access for low-income neighbors in Columbus, Ohio.
Learn more about Food Leads programming  <a style= {{ cursor: 'pointer', color: 'blue' }} onClick={() => window.open('https://www.foodleads.net')}>here</a>.
            </MDBCardSubTitle>
            <MDBCardBody>
              {
                donationAmountOptions.map(donationAmount => {
                  return (
                    <>
                      <MDBBtn onClick={() => { setDonationAmount(donationAmount); }} style={{ margin: '.5rem' }} className='primary-button' >
                        {formatCurrency(donationAmount)}
                      </MDBBtn>
                    </>
                  );
                })
              }
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>

    </>
  );
}
export default PriceChangeComponent;
