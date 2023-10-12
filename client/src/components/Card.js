//import { BsFillBagFill } from "react-icons/bs";
import './Card.css';

const Card = ({ img, address, city, type, bedrooms, bathrooms, year_built, price, features }) => {
  return (
    <>
        <div className="card">
            <img src='https://mdbootstrap.com/img/new/standard/nature/111.webp' alt={year_built} className="card-img" />
            <div className="card-details">
                <h3 className="card-title">${price}</h3>
                <div className="propertyInfo">
                    <h6>{type} Built at: {year_built}</h6>
                    <h6>{address} , {city}</h6>
                    <h6>bedrooms: {bedrooms} , bathrooms: {bathrooms}</h6>
                    <h6>{features}</h6>
                </div>
            </div>
        </div>

    </>
  );
};

export default Card;