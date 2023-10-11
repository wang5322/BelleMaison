import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DistanceMatrixService, GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import "../Property.css";
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Calculator from "../components/Calculator";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import ImageGallery from 'react-image-gallery';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const SingleProperty = () => {
  //Carousel
  // const images = [
  //   {
  //     original: <GetImageTest/>,
  //     thumbnail: <GetImageTest/>,
  //   },
  //   {
  //     original: "https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png",
  //     thumbnail: "https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png",
  //   },
  //   {
  //     original: "https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png",
  //     thumbnail: "https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png",
  //   }
  // ]
  const [pictures, setPictures] = useState([]);

  //save favourite

  const [favoriteProperty, setFavoriteProperty] = useState([]);

  //mortgage calculator
 
  //map
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  setKey(process.env.REACT_APP_GOOGLE_API_KEY);

  const [center, setCenterState] = useState({ lat: 0, lng: 0 });
  const [destination, setDestinationState] = useState({ lat: 0, lng: 0 });
  let { id } = useParams();
  const [property, setPropertyState] = useState({});
  useEffect(() => {
    axios.get("http://localhost:3005/api/pictures/byProp/6")
    .then((response) => {
      setPictures(response.data);
      
    })
    .catch((error) => {
      alert("there is an error");
    });
    axios.get(`http://localhost:3005/api/properties/byId/6`).then((res) => {
     
      setPropertyState(res.data);
      console.log(property);
      const tempAddress = `${res.data.address},${res.data.city}`;
      // setFavoriteProperty(res.data.favoriteProperty);
      // console.log(res.data.favoriteProperty);
      return fromAddress(tempAddress);
    }).then((res) => {
      setCenterState(res.results[0].geometry.location);
      return fromAddress("4330 Sherbrooke St W, Westmount, Quebec H3Z 1E2");
    }).then((res) => {
      console.log(res);
      setDestinationState(res.results[0].geometry.location);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const likeAProperty = (property_id) => {
    axios.post("http://localhost:3005/api/favorites",
      { property_id: property_id },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    )
    
      .then((res) => {
        if (res.data.liked) {
           return{...property, Favorites: [...property.Favorites, 0]}
        } else {
          const likesArray = property.Favorites;
          likesArray.pop();
          return {...property, Favorites: likesArray }
        }
        
      });
  };


  return (
    <div className="property">
      <Container className="mt-5 mb-5">
        <Row>
          <div className="col-lg-12">
            <div className="fd-top property-detail-content">
              <div>
                <h3 className="property-detail-title">House for sale</h3>
                <p className="address"><FmdGoodIcon />
                  {property.address}, {property.city}, {property.postal}</p>
              </div>
              <div>
                <FavoriteBorderIcon onClick={() => {
                  likeAProperty(property.id)
                }} 
                className={
                  favoriteProperty.includes(property.id)?"unlikeBttn":"likeBttn"
                }
                  />
                <span className="price">${property.price}</span>
              </div>
            </div>
            {/* {pictures.map((picture,key)=>{
              picture = [
                {
                  original:{imageUrl},
                  thumbnail:{imageUrl},
                }
              ]
              return(
                
                <ImageGallery flickThreshold={0.50} slideDuration={0} items={picture} showNav={false} showFullscreenButton={false} showPlayButton={false} />
              )
            })}
            */}

          </div>
          <Row>
            <div className="col-lg-8">
              <div className="property-item">
                <h4>Description</h4>
                <p>{property.description}</p>
              </div>
              <div className="property-item property-detail">
                <h4>Features</h4>
                <div className="row">
                  <div className="col-lg-4">
                    <span>{property.rooms} Rooms </span>

                  </div>
                  <div className="col-lg-4">
                    <span><BathtubIcon />Bathrooms </span>
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="col-lg-4">
                    <span><BedIcon />Bedrooms: </span>
                    <span>{property.bedrooms}</span>
                  </div>

                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <span>Year built:  </span>
                    <span>{property.year_built}</span>
                  </div>
                  <div className="col-lg-4">
                    <span>Building Style:  </span>
                    <span>{property.type}</span>
                  </div>

                  <div className="col-lg-4">
                    
                    <span>{property.features}</span>
                  </div>

                </div>

              </div>
            </div>
          </Row>
        </Row>


        {/* <div style={{ display: 'block', width: 700, padding: 30 }}>
        <Row>
          <Col className="col-lg-12">
            <h4>React-Bootstrap Carousel Component</h4>
            <Carousel>
              <Carousel.Item interval={1500}>
                <img
                  className="d-block w-100"
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
                  alt="Image One"
                />
                <Carousel.Caption>
                  <h3>Label for first slide</h3>
                  <p>Sample Text for Image One</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <img
                  className="d-block w-100"
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                  alt="Image Two"
                />
                <Carousel.Caption>
                  <h3>Label for second slide</h3>
                  <p>Sample Text for Image Two</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </div> */}


        <Row>
          <Col md={6}>
            <div className="Calculator" style={{ maxWidth: 500, margin: "1rem auto" }} >
              <div>
                <h2>Mortgage Calculator</h2>
                <Calculator />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <h2>result</h2>
          </Col>
        </Row>

      </Container>
     
        <Row>
          <Col md={6}>
            <h2>View on Map</h2>
            <p>distance to John Abott College: </p>
          </Col>


          <Col md={6}>
            <div className="SingleProperty">
              {!isLoaded ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  mapContainerClassName="map-container"
                  center={center}
                  zoom={10}
                >
                  <MarkerF
                    position={center}
                    icon="http://maps.google.com/mapfiles/kml/pal2/icon10.png" />
                  <MarkerF
                    position={destination}
                    icon="http://maps.google.com/mapfiles/kml/pal2/icon10.png" />
                  <DistanceMatrixService
                    options={{
                      origins: [center],
                      destinations: [destination],
                      travelMode: "DRIVING",
                    }}
                    callback={(response) => {
                      const distance = response.rows[0].elements[0].distance;
                      if (distance) {

                        // console.log(response.rows[0].elements[0].distance.text);
                      }
                    }}
                  />
                </GoogleMap>
              )}
            </div>

          </Col>
        </Row>

     
    </div>
  );
};

export default SingleProperty;