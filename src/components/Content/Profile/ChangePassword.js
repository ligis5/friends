import React, { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../FirebaseComponents/firebaseFunctionsAuth";

const ChangePassword = ({ handleClose, show }) => {
  const oldPassword = useRef();
  const newPassword = useRef();
  const newPassword1 = useRef();
  const { changePassword } = useAuth();
  const [wrongPass, setWrongPass] = useState("none");
  const [visible, setVisible] = useState("none");
  const [visible1, setVisible1] = useState("none");

  const submitNewPassword = async (e) => {
    e.preventDefault();
    if (newPassword.current.value.length >= 8) {
      if (newPassword.current.value !== newPassword1.current.value) {
        setVisible("");
        setVisible1("none");
        setWrongPass("none");
      } else {
        try {
          if (oldPassword.current.value && newPassword.current.value) {
            await changePassword(
              oldPassword.current.value,
              newPassword.current.value
            );
            handleClose();
          }
        } catch (error) {
          if (error.code === "auth/wrong-password") {
            setVisible1("");
            setVisible("none");
            setWrongPass("none");
          } else {
            console.log(error);
          }
        }
      }
    } else {
      setWrongPass("");
      setVisible1("none");
      setVisible("none");
    }
  };

  const closeClear = () => {
    setVisible("none");
    setVisible1("none");
    setWrongPass("none");
    handleClose();
  };

  return (
    <>
      <Modal
        centered
        style={{ color: "aliceblue", opacity: "90%" }}
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header style={{ border:'1px solid aliceblue'}}>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ border:'1px solid aliceblue'}}>
          <Form onSubmit={submitNewPassword}>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>
                Old Password{" "}
                <p style={{ display: visible1, color: "#da1c1c" }}>
                  Wrong password
                </p>
                <p style={{ display: wrongPass, color: "#da1c1c" }}>
                  Password is to short and should contain atleast 8 characters
                </p>
              </Form.Label>
              <Form.Control
                ref={oldPassword}
                type="password"
                placeholder="Old Password"
              />
            </Form.Group>
            <Form.Group controlId="formGroupPasswordNew">
              <Form.Label>
                New Password
                <p style={{ display: visible, color: "#da1c1c" }}>
                  Passwords do not match.
                </p>
              </Form.Label>
              <Form.Control
                ref={newPassword}
                type="password"
                placeholder="New Password"
              />
            </Form.Group>
            <Form.Group controlId="formGroupPasswordNewConfirm">
              <Form.Label>
                New Password
                <p style={{ display: visible, color: "#da1c1c" }}>
                  Passwords do not match.
                </p>
              </Form.Label>
              <Form.Control
                ref={newPassword1}
                type="password"
                placeholder="New Password"
              />
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                style={{
                  backgroundColor: "rgb(79, 59, 120)",
                  border: "1px solid aliceblue",
                }}
                onClick={closeClear}
              >
                Close
              </Button>
              <Button
                variant="primary"
                style={{
                  backgroundColor: "rgb(79, 59, 120)",
                  border: "1px solid aliceblue",
                }}
                type="submit"
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePassword;
