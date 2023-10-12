import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';

function BrokerList() {
    const [brokerList, setBrokerList]= useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:3005/api/users/broker`).then((response)=>{         
         let approvedBrokers = response.data.filter(x=>x.broker_approval==1);
         setBrokerList(approvedBrokers);
        })
    }, [])
  return (
    <Container className="pt-5">
       <Row xs={1} md={2} className="g-4">
      {brokerList.map((value, key) =>{
        return(
            <Col key={value.id}> 
            <Card style={{ width: '18rem' }} bg="warning" >
            <Card.Img variant="left" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{value.name}</Card.Title>
              <Card.Text>
               <span><PhoneIcon/></span> <span>{value.phone}</span> 
               <span><MailIcon/></span> <span>{value.email}</span>
              </Card.Text>
            </Card.Body>
            </Card>
            </Col>
        
      ) 
        
    })}
    </Row>
    </Container>
  )
}

export default BrokerList
