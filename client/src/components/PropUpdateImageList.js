import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Container } from "react-bootstrap";

function PropUpdateImageList({ pictures }) {
  const deleteImage = () => {
    console.log("image deleted");
  };
  return (
    <React.Fragment>
      <Container>
        <hr />
        <Row className="my-3 px-4">
          {" "}
          <h3> Pictures of the property</h3>
        </Row>

        <Row className="justify-content-center">
          {pictures.map((picture) => {
            return (
              <Card
                key={picture.id}
                style={{ width: "15rem" }}
                className="mx-1 my-1"
              >
                <Card.Img
                  variant="top"
                  src={picture.imageUrl}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />

                <Card.Body className="justify-content-end">
                  <Button variant="dark" type="submit" onSubmit={deleteImage}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default PropUpdateImageList;
