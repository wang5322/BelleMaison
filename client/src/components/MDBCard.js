import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import './Card.css';



const Card = ({ img, address, city, type, bedrooms, bathrooms, year_built, price, features }) => {
    return (
      <>
        <MDBCard className='propCard'>
            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage className='card-img' src={img} fluid alt={type} />
                <a>
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
            </MDBRipple>
            <MDBCardBody>
                <MDBCardTitle>${price}</MDBCardTitle>
                <MDBCardText>
                    <div className="propertyInfo">
                        <h6>{type} Built at: {year_built}</h6>
                        <h6>{address} , {city}</h6>
                        <h6>bedrooms: {bedrooms} , bathrooms: {bathrooms}</h6>
                        {/* <p>{features}</p> */}
                    </div>
                </MDBCardText>
                {/* <MDBBtn href='#'>Detail</MDBBtn> */}
            </MDBCardBody>
            </MDBCard>
      </>
    );
  };
  
  export default Card;