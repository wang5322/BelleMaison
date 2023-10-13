import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Card, FloatingLabel, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "../css/main.css";

function BrokerProfile() {
  const { id } = useParams();
  const [broker, setBroker] = useState({});
  const [files, setFiles] = useState([]);
  const [profile, setProfile] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fileSelected = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the selected image to the data URL
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //Error Modal section
  const [show, setShow] = useState({ error: "", status: false });
  const handleClose = () => setShow({ error: "", status: false });
  const handleShow = (errorMessage) =>
    setShow({ error: errorMessage, status: true });

  //Profile Modal section
  const [showProfileEdit, setProfileEdit] = useState({
    brokerId: "",
    status: false,
  });
  const handleProfileClose = () => {
    setProfileEdit({ brokerId: "", status: false });
    setSelectedImage(null);
  };

  const handleProfileShow = () =>
    setProfileEdit({ brokerId: id, status: true });

  //Get broker info
  useEffect(() => {
    Axios.get(`http://localhost:3005/api/users/${id}`)
      .then((response) => {
        setBroker(response.data);
        const profileUrl = response.data.Pictures[0].imageUrl;
        for(let i=0;i<response.data.Pictures.length;i++){
            if(isnull(response.data.Pictures[i].isCertificate)){
              setProfile(profileUrl);
            }
        }
        setProfile(profileUrl);

        console.log(response.data);
      })
      .catch((error) => {
        // if (error.response.data.message) {
        //   handleShow(error.response.data.message);
        // } else {
        //   handleShow("There is an error occured while loggin in");
        // }
      });
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true, // Allow the form to reinitialize when initial values change
    initialValues: {
      name: broker ? broker.name : "",
      phone: broker ? broker.phone : "",
      address: broker ? broker.address : "",
      email: broker ? broker.email : "",
    },
  });
  return (
    <div>
      <Container>
        <Row>
          <h1>Broker Profile</h1>
        </Row>
        <Card className="mt-4">
          <Form onSubmit={formik.handleSubmit}>
            <Row className="brokerInfo px-3 py-3">
              <Col md={7} className="leftInfo">
                {/* name */}
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <FloatingLabel controlId="form.name" label="Broker name">
                    {" "}
                    <Form.Control
                      name="name"
                      type="text"
                      className="mb-2"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                {/* phone */}
                <Form.Group>
                  <Form.Label>Phone:</Form.Label>
                  <FloatingLabel
                    controlId="form.name"
                    label="Broker phone number"
                  >
                    {" "}
                    <Form.Control
                      name="phone"
                      type="text"
                      className="mb-2"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                {/* address */}
                <Form.Group>
                  <Form.Label>Address:</Form.Label>
                  <FloatingLabel controlId="form.name" label="Office address">
                    {" "}
                    <Form.Control
                      name="address"
                      type="text"
                      className="mb-2"
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                {/* address */}
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <FloatingLabel controlId="form.name" label="Email">
                    {" "}
                    <Form.Control
                      name="email"
                      type="text"
                      className="mb-2"
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col md={5} className="rightProfilePic justify-content-center">
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img className="profile" src={profile} alt="Selected" />
                </div>
                {profile ? (
                  <Button onClick={handleProfileShow}>Modify Profile</Button>
                ) : (
                  <Button onClick={handleProfileShow}>Add Profile</Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
        <Row className="propertyList"></Row>
        <Row className="certificate"></Row>

        {/* Modal rendering */}
        <Modal show={show.status} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Oops!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{show.error}</Modal.Body>
          <Modal.Footer>
            <Button
              className="bluButton"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Profile Modal rendering */}
        <Modal show={showProfileEdit.status} onHide={handleProfileClose}>
          <Modal.Header>
            <Modal.Title>Choose your profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Display the selected image */}
            {selectedImage && (
              <Row className="justify-content-center my-2">
                <h2>Selected Profile</h2>
                <div
                  style={{
                    width: "200px",
                    height: "180px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img className="profile" src={selectedImage} alt="Selected" />
                </div>
              </Row>
            )}
            <Form>
              <Form.Group>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Button className="mt-3" type="submit" onClick={fileSelected}>
                Upload
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="bluButton"
              variant="secondary"
              onClick={handleProfileClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default BrokerProfile;

<Form.Group>
  <Form.Control type="file"></Form.Control>
</Form.Group>;
