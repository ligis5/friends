import React, { useRef, useState } from "react";
import { Button, Modal, Image, InputGroup, Row, Form } from "react-bootstrap";
import { useAuth } from "../../FirebaseComponents/firebaseFunctionsAuth";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import leaving from "./leaving.jpg";

const DeleteUser = ({ handleClose1, show1 }) => {
  const { reuthenticateUser } = useAuth();
  const { deleteUserData } = useData();
  const [wrongPass, setWrongPass] = useState("none");
  const password = useRef();

  const byeByeUser = (e) => {
    e.preventDefault();
    if (password.current.value.length > 0) {
      reuthenticateUser(password.current.value)
        .then(() => {
          deleteUserData();
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setWrongPass("");
          } else {
            console.log(error);
          }
        });
    }
  };
  const cancelDelete = () => {
    handleClose1();
    setWrongPass("none");
  };
  return (
    <Modal
      centered
      style={{ color: "aliceblue", opacity: "95%" }}
      show={show1}
      onHide={handleClose1}
      animation={false}
    >
      <Modal.Header>
        <Modal.Title>Delete account ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          style={{ marginLeft: "8px", marginBottom: "16px" }}
          width="450px"
          src={leaving}
        />
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Row style={{ width: "400px" }}>
            <Form.Label>
              Password{" "}
              <p style={{ display: wrongPass, color: "#da1c1c" }}>
                Wrong password.
              </p>
            </Form.Label>
            <InputGroup>
              <Form.Control
                ref={password}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
          </Row>
          <Row
            style={{
              display: "flex",
              marginLeft: "250px",
              gap: "10px",
              width: "400px",
            }}
          >
            <Button
              variant="secondary"
              style={{
                backgroundColor: "rgb(79, 59, 120)",
                border: "1px solid aliceblue",
              }}
              onClick={cancelDelete}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              style={{
                backgroundColor: "rgb(65, 5, 0)",
                border: "1px solid aliceblue",
              }}
              onClick={byeByeUser}
            >
              Confirm
            </Button>
          </Row>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUser;
