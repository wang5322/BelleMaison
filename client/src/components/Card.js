//import { BsFillBagFill } from "react-icons/bs";
import './Card.css';

const Card = ({ img, address, city, type, bedrooms, bathrooms, year_built, price, features }) => {
  return (
    <>
        <div className='card-container'>
            <div className="card">
                <img src={img} alt={year_built} className="card-img" />
                <div className="card-details">
                    <h3 className="card-title">${price}</h3>
                    <div className="propertyInfo">
                        <p>{type} Built at: {year_built}</p><br/>
                        <p>{address} | {city}</p><br/>
                        <p>bedrooms: {bedrooms} | bathrooms: {bathrooms}</p><br/>
                        <p>{features}</p>
                    </div>

                </div>
            </div>
      </div>
    </>
  );
};

export default Card;