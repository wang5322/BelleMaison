import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Card, FloatingLabel, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Axios from "axios";
import "../css/main.css";
// import { AuthContext } from "../helpers/AuthContext";

function BrokerProfile() {
  const id = 15;
  const [broker, setBroker] = useState({});
  const [files, setFiles] = useState([]);
  const [profile, setProfile] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  //   const { authState } = useContext(AuthContext);
  //   const id = authState.id;
  //   console.log("id====", id);
  //   console.log("authId====", authState.id);

  const uploadFiles = () => {
    // const selectedFiles = Array.from(event.target.files);
    // setFiles(selectedFiles);
    if (files && files.length > 0) {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });
      console.log("====button clicked====");

      console.log("Broker Id is", id);
      const brokerId = id;
      formData.append("brokerId", brokerId);

      Axios.post("http://localhost:3005/api/pictures", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          console.log("pictureId", response.data.id);
        })
        .catch((error) => {
          if (error.response.data.message) {
            handleShow(error.response.data.message);
          } else {
            handleShow(
              "There is an error occured while deleting profile picture"
            );
          }
        });
      setFiles([]);
      window.location.reload();
    } else {
      console.log("No files selected");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        // Set the selected image to the data URL
        setSelectedImage(reader.result);
        console.log("reader.result====", reader.result);
      };
    }
  };

  //Error Modal section
  const [show, setShow] = useState({ error: "", status: false });
  const handleClose = () => setShow({ error: "", status: false });
  const handleShow = (errorMessage) =>
    setShow({ error: errorMessage, status: true });

  //Profile Modal section
  const [showProfileEdit, setProfileEdit] = useState(false);
  const handleProfileClose = () => {
    setProfileEdit(false);
    setSelectedImage(null);
  };
  const handleProfileShow = () => setProfileEdit(true);

  const deleteProfile = (profilId) => {
    Axios.delete(`http://localhost:3005/api/pictures/${profilId}`)
      .then(() => {
        setProfile({});
      })
      .catch((error) => {
        if (error.response.data.message) {
          handleShow(error.response.data.message);
        } else {
          handleShow(
            "There is an error occured while deleting profile picture"
          );
        }
      });
  };
  //Get broker info
  useEffect(() => {
    Axios.get(`http://localhost:3005/api/users/${id}`)
      .then((response) => {
        setBroker(response.data);

        for (let i = 0; i < response.data.Pictures.length; i++) {
          if (response.data.Pictures[i].isCertificate !== 1) {
            setProfile(response.data.Pictures[i]);
            console.log("imageUrl====", response.data.Pictures[i].imageUrl);
            return;
          } else {
            setCertificates(response.data.Pictures[i]);
          }
        }
        console.log(response.data);
        console.log("profileInfo====", profile);
      })
      .catch((error) => {
        if (error.response.data.message) {
          handleShow(error.response.data.message);
        } else {
          handleShow("There is an error occured while getting broker info");
        }
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
              <Col
                md={5}
                className="mt-5 rightProfilePic justify-content-center"
              >
                <Row className="justify-content-center">
                  <div
                    style={{
                      width: "230px",
                      height: "210px",
                      overflow: "hidden",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className="profile"
                      src={
                        profile && Object.keys(profile).length !== 0
                          ? profile.imageUrl
                          : "https://cdn.vectorstock.com/i/preview-1x/21/23/avatar-photo-default-user-icon-person-image-vector-47852123.jpg"
                      }
                      alt="Selected"
                    />
                  </div>
                </Row>
                <Row className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center">
                    {profile && Object.keys(profile).length !== 0 ? (
                      <Button
                        className="mt-3"
                        variant="dark"
                        onClick={() => {
                          deleteProfile(profile.id);
                        }}
                      >
                        Delete profile
                      </Button>
                    ) : (
                      <Button className="mt-3" onClick={handleProfileShow}>
                        Add Profile
                      </Button>
                    )}
                  </div>
                </Row>
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
        <Modal show={showProfileEdit} onHide={handleProfileClose}>
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
              <Button className="mt-3" onClick={uploadFiles}>
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
