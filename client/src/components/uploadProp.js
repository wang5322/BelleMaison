import React from "react";
import { Col, Row, Form, Button, FloatingLabel } from "react-bootstrap";
import ErrorMessageAlert from "./ErrorMessageAlert";

function uploadProp({ formik, onFileSelected }) {
  return (
    <React.Fragment>
      <Row md="10" className="px-4 py-4 justify-content-md-center mt-3">
        {/* Left Section */}
        <Col md="7" className="leftSection">
          {/* Property Price */}
          <ErrorMessageAlert
            field={formik.getFieldProps("price")}
            formik={formik}
          />
          <Form.Group className="mb-3" controlId="form.propertyPrice">
            <Form.Label>Property Price:</Form.Label>
            <FloatingLabel
              controlId="form.priceInput"
              label="Property Price"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="price"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </Form.Group>
          {/* Property Address */}
          <ErrorMessageAlert
            field={formik.getFieldProps("address")}
            formik={formik}
          />
          <Form.Group className="mb-3" controlId="form.address">
            <Form.Label>Property address:</Form.Label>
            <FloatingLabel
              controlId="form.addressInput"
              label="Property Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="address"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </Form.Group>
          {/* Property City */}
          <ErrorMessageAlert
            field={formik.getFieldProps("city")}
            formik={formik}
          />
          <Form.Group className="mb-3" controlId="form.city">
            <Form.Label>Property City:</Form.Label>
            <FloatingLabel
              controlId="form.cityInput"
              label="Property City"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="city"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </Form.Group>
          {/* Year Built and Postal line */}
          <ErrorMessageAlert
            field={formik.getFieldProps("year_built")}
            formik={formik}
          />
          <ErrorMessageAlert
            field={formik.getFieldProps("postal")}
            formik={formik}
          />
          <Row className="justify-content-center">
            {/* Year Built */}
            <Col md="6">
              <Form.Group className="mb-3" controlId="form.yearBuilt">
                <Form.Label>Year Built:</Form.Label>
                <FloatingLabel
                  controlId="form.yearBuiltInput"
                  label="Year Built"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="year_built"
                    onChange={formik.handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            {/* Postal */}
            <Col md="6">
              <Form.Group className="mb-3" controlId="form.postal">
                <Form.Label>Postal:</Form.Label>
                <FloatingLabel
                  controlId="form.postalInput"
                  label="Postal(format:H2D 343)"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="postal"
                    onChange={formik.handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          {/* Input of room numbers */}
          <ErrorMessageAlert
            field={formik.getFieldProps("bedrooms")}
            formik={formik}
          />
          <ErrorMessageAlert
            field={formik.getFieldProps("bathrooms")}
            formik={formik}
          />
          <ErrorMessageAlert
            field={formik.getFieldProps("rooms")}
            formik={formik}
          />
          <Row className="justify-content-center">
            {/* Bedrooms */}
            <Col md="4">
              {" "}
              <Form.Group className="mb-3" controlId="form.bedrooms">
                <Form.Label>Bedroom Num:</Form.Label>
                <FloatingLabel
                  controlId="form.bedroomsInput"
                  label="Bedroom Num"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="bedrooms"
                    onChange={formik.handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            {/* Bathrooms */}
            <Col md="4">
              {" "}
              <Form.Group className="mb-3" controlId="form.bathrooms">
                <Form.Label>Bathroom Num:</Form.Label>
                <FloatingLabel
                  controlId="form.bathroomsInput"
                  label="Bedroom Num"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="bathrooms"
                    onChange={formik.handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            {/* Rooms */}
            <Col md="4">
              {" "}
              <Form.Group className="mb-3" controlId="form.rooms">
                <Form.Label>Room Num:</Form.Label>
                <FloatingLabel
                  controlId="form.roomsInput"
                  label="Room Num"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="rooms"
                    onChange={formik.handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          {/* Building Style */}
          <ErrorMessageAlert
            field={formik.getFieldProps("type")}
            formik={formik}
          />
          <Form.Group className="mb-3" controlId="form.buildingStyle">
            <Form.Label>Building Style</Form.Label>
            <FloatingLabel
              controlId="form.buildingStyleInput"
              label="Building Style"
              className="mb-3"
            >
              <Form.Select
                aria-label="building style select"
                name="type"
                // value={formik.values.type}
                onChange={formik.handleChange}
              >
                <option>Select building style</option>
                <option value="single-family">Single-Family</option>
                <option value="studio">Studio</option>
                <option value="condo">Condo</option>
                <option value="plex">Plex</option>
                <option value="cottage">Cottage</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          {/* Lot Area and Parking */}
          <ErrorMessageAlert
            field={formik.getFieldProps("lotArea")}
            formik={formik}
          />
          <ErrorMessageAlert
            field={formik.getFieldProps("parking")}
            formik={formik}
          />
          <Row className="justify-content-center">
            {/* Lot area */}
            <Col md="6">
              <Form.Group className="mb-3" controlId="form.lotArea">
                <Form.Label>Lot Area:</Form.Label>
                <FloatingLabel
                  controlId="form.lotAreaInput"
                  label="Lot Area"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="lotArea"
                    onChange={formik.handleChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            {/* Parking Num */}
            <Col md="6">
              <Form.Group className="mb-3" controlId="form.parkingNumber">
                <Form.Label>Parking:</Form.Label>
                <FloatingLabel
                  controlId="form.parkingNumberInput"
                  label="Parking Number"
                  className="mb-3"
                >
                  <Form.Select
                    aria-label="Select parking number"
                    name="parking"
                    // value={formik.values.parking}
                    onChange={formik.handleChange}
                  >
                    <option>Select parking number</option>
                    <option value="0">No drive way</option>
                    <option value="1">One drive way</option>
                    <option value="2">Two drive ways</option>
                    <option value="3">Three drive ways</option>
                    <option value="4">Four drive ways</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            </Col>
            {/* Submit Button              */}
            <div className="px-2 justify-content-end">
              <Button variant="info" className="col-md-3" type="Submit">
                Create
              </Button>
            </div>
          </Row>
        </Col>

        {/* Right Section */}
        <Col md="5" className="rightSection">
          {/* Additional features */}
          <ErrorMessageAlert
            field={formik.getFieldProps("features")}
            formik={formik}
          />
          <Form.Group className="mb-3" controlId="form.additionalFeatures">
            <Form.Label>Additional Features:</Form.Label>
            <FloatingLabel
              controlId="form.AdditionalFeaturesInput"
              label="Add addtional features in here"
              className="mb-3"
            >
              <Form.Control
                style={{ height: "165px" }}
                as="textarea"
                rows={8}
                placeholder="Add addtional features in here"
                name="features"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </Form.Group>

          {/* Description */}
          <ErrorMessageAlert
            field={formik.getFieldProps("description")}
            formik={formik}
          />
          <Form.Group className="mb-3" controlId="form.description">
            <Form.Label>Description:</Form.Label>
            <FloatingLabel
              controlId="form.descriptionInput"
              label="Add description for this property"
              className="mb-3"
            >
              <Form.Control
                style={{ height: "270px" }}
                as="textarea"
                rows={8}
                placeholder="Add description for this property"
                name="description"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </Form.Group>

          {/* Image uploading */}
          <Form.Group controlId="formPropertyPictures" className="mb-3">
            <Form.Label>Upload Property Pictures</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={onFileSelected}
            />
          </Form.Group>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default uploadProp;
