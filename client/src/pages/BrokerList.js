import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import BrokerCard from "../components/BrokerCard";


function BrokerList() {
  const [brokerList, setBrokerList] = useState([]);
  const [brokerImage, setBrokerImage] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3005/api/users/broker`).then((response) => {
      let approvedBrokers = response.data.filter(x => x.broker_approval == 1);

      let brokerId = 0;

      for (let i = 0; i < approvedBrokers.length; i++) {
        brokerId = approvedBrokers[i].id;
        axios.get(`http://localhost:3005/api/pictures/byBroker/${brokerId}`).then((res) => {
          approvedBrokers[i].brokerImage = res.data[0].imageUrl;
        });
      }

      setBrokerList(approvedBrokers);

    });


  }, [])
  return (
    <Container className="pt-5">
      <Row xs={1} md={2} className="g-4">
        {brokerList.map((value, key) => {
          return (
            <Col key={value.id}>
              
              <BrokerCard imgUrl={value.brokerImage} name={value.name} phone={value.phone} email={value.email} />
            
            </Col>

          )

        })}
      </Row>
    </Container>
  )
}

export default BrokerList
