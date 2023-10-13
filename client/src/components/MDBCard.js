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
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import {useNavigate} from 'react-router-dom';


const Card = ({ img, address, city, type, bedrooms, bathrooms, year_built, price, features }) => {
  let navigate = useNavigate();
    return (
      <>
        <MDBCard className='propCard' >
            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                {img!=="notFound" && 
                    <img className='card-img' src={img} fluid alt={type} 
                      onError={({currentTarget})=>{
                        currentTarget.onerror=null; 
                        currentTarget.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'}} />}
                {img==="notFound" && 
                    <img className='card-img' src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' alt={type} />}
                {/* <a>
                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a> */}
            </MDBRipple>
            <MDBCardBody>
                <MDBCardTitle>${price}</MDBCardTitle>
                <div className="propertyInfo">
                    <p>{type} Built at: {year_built}</p>
                    <p>{address} , {city}</p>
                    {/* <p>bedrooms: {bedrooms} , bathrooms: {bathrooms}</p> */}
                    <span><BedIcon />Bedrooms: {bedrooms}</span><br></br>
                    <span><BathtubIcon />Bathrooms: {bathrooms} </span>
                    {/* <p>{features}</p> */}
                </div>
                <MDBBtn href='/property'>Detail</MDBBtn>
            </MDBCardBody>
            </MDBCard>
      </>
    );
  };
  
  export default Card;