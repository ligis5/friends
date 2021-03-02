import React from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { useAuth } from "../../FirebaseComponents/firebaseFunctionsAuth";
import leaving from "./leaving.jpg";

const DeleteUser = ({ handleClose1, show1 }) => {
  return (
    <Modal
      centered
      style={{ color: "aliceblue", opacity: "95%" }}
      show={show1}
      onHide={handleClose1}
      animation={false}
    >
      <Modal.Header>
        <Modal.Title>Delete account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          style={{ marginLeft: "8px", marginBottom: "16px" }}
          width="450px"
          src={leaving}
        />
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{
              backgroundColor: "rgb(79, 59, 120)",
              border: "1px solid aliceblue",
            }}
            onClick={handleClose1}
          >
            Close
          </Button>
          <Button
            variant="primary"
            style={{
              backgroundColor: "rgb(79, 59, 120)",
              border: "1px solid aliceblue",
            }}
            onClick={handleClose1}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUser;
