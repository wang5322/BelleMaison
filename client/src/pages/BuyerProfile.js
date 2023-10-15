import React, { useContext,useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Formik, Field } from "formik";
import * as Yup from 'yup';
import "./BuyerProfile.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import { Button } from 'react-bootstrap';

function BuyerProfile() {
  let navigate=useNavigate();
  const [user, setUser] = useState({});
  //const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const id = authState.id;
  console.log ("id is " + id);
  const [favorites, setFavourites]=useState([]);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
    email: Yup.string().email().required(),
    phone: Yup.string().matches(phoneRegExp, 'please enter a valid phone number').min(10, "must be 10 digits").max(10, "must be 10 digits").nullable(),
  });
  const onSubmit = (data) => {
    axios.post()
  }
  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      navigate("/login")
    }else{
      axios.get(`http://localhost:3005/api/users/${id}`,
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    ).then((res) => {
      setUser(res.data);
      
    })
    
      .catch((error) => {
        alert("there is an error");
      });
    
    }
     axios.get("http://localhost:3005/api/favorites",
     { headers: { accessToken: localStorage.getItem("accessToken") } }
     ).then((res)=>{
      setFavourites(res.data);
     }) 
    
  }, []);

  return (

    <Container className="mt-5 mb-5">
      {/* <Row>
         <Form>
         <h1>My Profile</h1> 
            <Form.Group className="mb-3" controlId="userPanel">
             
              <Form.Label>Email:  </Form.Label> 
              <Form.Control type="email" value={}></Form.Control>
            </Form.Group>
         </Form>
         </Row>
        </Container>  */}

      <Formik enableReinitialize= {true}
       initialValues={{ name: user.name, email: user.email, phone: user.phone }}
       onSubmit={onsubmit} validationSchema={validationSchema}>

        <Form className='userPanel'>
          <h1>My Profile</h1>
          <button type="submit">change my profile</button>
          <label>Name: </label>
          <Field id="buyerInfor" name="name" />
          <label>Email: </label>
          <Field id="buyerInfor" name="email" />
          <label>Phone: </label>
          <Field id="buyerInfor" name="phone" />

        </Form>
      </Formik>
     
    </Container>

  )
}

export default BuyerProfile
