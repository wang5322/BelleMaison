import React from 'react';
import Card from 'react-bootstrap/Card';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
const BrokerCards=({name, imgUrl, phone, email})=>{
    return(
        <Card style={{ width: '18rem' }} bg="warning" >
            <Card.Img variant="left" src={imgUrl} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
               <span><PhoneIcon/></span> <span>{phone}</span> 
               <span><MailIcon/></span> <span>{email}</span>
              </Card.Text>
            </Card.Body>
            </Card>
    )
}
export default BrokerCards;