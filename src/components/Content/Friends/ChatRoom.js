import React, { useRef, useEffect, useState } from "react";
import { Modal, Form, Container } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import Message from "./Message";
import "./ChatRoom.css";

const ChatRoom = ({ onHide, show, user }) => {
  const writtenMessage = useRef();
  const messagesEndRef = useRef(null);
  const [load, setLoad] = useState(false);
  const {
    userData,
    senderMessages,
    recipientMessages,
    writeMessage,
  } = useData();

  let messages = [];
  if (senderMessages) {
    messages = [...recipientMessages, ...senderMessages];
    messages.sort((a, b) => {
      return a.data().createdAt.seconds - b.data().createdAt.seconds;
    });
  }
  const filteredMessages = messages.filter(
    (m) => m.data().sender === user.userId || m.data().recipient === user.userId
  );

  const confirmComment = (e) => {
    e.preventDefault();
    if (writtenMessage.current.value.length > 0) {
      writeMessage(writtenMessage.current.value, user.userId);
      e.target.reset();
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      inline: "start",
    });
  };

  useEffect(() => {
    if (show) {
      scrollToBottom();
    }
  }, [show]);
  return (
    <Modal
      className="chatRoom"
      animation={false}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h1>{user.UserName}</h1>
        <h1 style={{ marginLeft: "auto" }}>{userData.UserName}</h1>
      </Modal.Header>
      <Modal.Body style={{ overflowY: "auto" }}>
        <Container className="allMessages">
          {filteredMessages.map((m) => (
            <Message user={user} key={m.id} messages={m.data()} />
          ))}
          <div style={{ alignSelf: "end" }} ref={messagesEndRef} />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Form className="writeChat" onSubmit={(e) => confirmComment(e)}>
          <button type="button" className="chooseButton" onClick={onHide}>
            Close
          </button>
          <Form.Group style={{ margin: "0px" }}>
            <Form.Control
              ref={writtenMessage}
              as="textarea"
              rows={9}
              style={{
                resize: "none",
                color: "rgb(56, 41, 84)",
                fontSize: "100%",
                fontWeight: "400",
                backgroundColor: "aliceblue",
                height: "70px",
                width: "430px",
                overflowY: "auto",
                marginTop: "20px",
              }}
            />
          </Form.Group>
          <button className="chooseButton" type="submit">
            Send
          </button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatRoom;
