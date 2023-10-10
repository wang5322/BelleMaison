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
import "../App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SingleProperty = () => {
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
    axios.get(`http://localhost:3005/api/properties/byId/6`).then((res) => {
      setPropertyState(res.data);
      console.log(property);
      const tempAddress = `${res.data.address},${res.data.city}`;
      return fromAddress(tempAddress);
    }).then((res)=>{
        setCenterState(res.results[0].geometry.location);
        return fromAddress("4330 Sherbrooke St W, Westmount, Quebec H3Z 1E2");
      }).then((res) => {
        console.log(res);
        setDestinationState(res.results[0].geometry.location);
      }).catch((err) => {
        console.log(err);
      }); 
  }, []);

  return (
    <Container fluid='md'>


      <h2>Mortgage Calculator</h2>

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
                  console.log(response.rows[0].elements[0].distance.text);
                }
              }}
            />
          </GoogleMap>
        )}
      </div>
    </Container>
  );
};

export default SingleProperty;