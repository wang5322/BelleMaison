import React, { useState } from "react";
import { useFormik } from "formik";
import { Row, Col, Form, Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Axios from "axios";
import * as Yup from "yup";
import UploadProp from "../components/uploadProp";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

function PostListing() {
  const { setAuthState } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);

  const [files, setFiles] = useState([]);

  const fileSelected = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const formik = useFormik({
    initialValues: {
      price: "",
      address: "",
      city: "",
      year_built: "",
      postal: "",
      bedrooms: 0,
      bathrooms: 0,
      rooms: 0,
      type: "",
      lotArea: "",
      parking: 0,
      features: "",
      description: "",
      isActive: 1,
    },
    validationSchema: Yup.object({
      price: Yup.number("Price must be a whole number").required(
        "Price is required"
      ),
      address: Yup.string()
        .required("Address is required")
        .min(5, "Must be at least 5 characters")
        .max(100, "Maximum length for address is 100 characters"),
      city: Yup.string().max(40, "Maxium length for city is 40 characters"),
      year_built: Yup.number(),
      postal: Yup.string()
        .required("Postal is required")
        .matches(
          /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/,
          "Postal is in H3X 3HE format"
        ),
      bedrooms: Yup.number().required("Bedroom number is required"),
      bathrooms: Yup.number().required("Bathroom number is required"),
      rooms: Yup.number().required("Total room number is required"),
      type: Yup.string().required("Building type is required"),
      lotArea: Yup.number().required("Lot area is required"),
      parking: Yup.number().required("Parking number is required"),
      features: Yup.string().max(
        1000,
        "The length of description is over the maximum 1000 characters"
      ),
      description: Yup.string().max(
        4000,
        "The length of description is over the maximum 4000 characters"
      ),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
      });
      console.log("button clicked");
      console.log("Property values are:", values);

      try {
        const response = await Axios.post(
          "http://localhost:3005/api/properties",
          values,
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        console.log("Property Id is", response.data.id);
        const propertyId = response.data.id;
        formData.append("propertyId", propertyId);

        await Axios.post("http://localhost:3005/api/pictures", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setFiles([]);
      } catch (error) {
        if (error.response && error.response.data.message) {
          // TODO: Replace with modal
          alert(error.response.data.message);
        } else {
          alert("There is an error occurred while uploading property");
        }
      }
    },
  });

  return (
    <React.Fragment>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="12">
            <Card className="shadow-lg mt-2 d-flex justify-content-center">
              <Row px="2" mt="5">
                <h1 class="row mt-3 offset-1">Post New Listing</h1>
              </Row>
              <Form onSubmit={formik.handleSubmit}>
                <UploadProp
                  formik={formik}
                  onFileSelected={fileSelected}
                ></UploadProp>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default PostListing;
