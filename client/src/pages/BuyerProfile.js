import React, { useEffect,useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { AuthContext } from "../helpers/AuthContext";

function BuyerProfile() {
    const [user, setUser]=useState({});
    const id = useParams();
    useEffect(()=>{
        axios.get(`http:localhost:3005/api/users/${id}`,
        { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then((res)=>{
            
                setUser(res.data);
        })
        .catch((error)=>{
            alert("there is an error");
        })
    })
  return (
    <div className='user'>
       <Container className="mt-5 mb-5">
         <Form>
            <Form.Group className="mb-3" controlId="userPanel">
                
            </Form.Group>
         </Form>
        </Container> 
      
    </div>
  )
}

export default BuyerProfile
