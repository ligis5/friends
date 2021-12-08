import React, { useRef, useEffect } from "react";
import { Modal, Form, Container } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import Message from "./Message";
import UserPhoto from "../userPhoto";
import "./ChatRoom.css";

const ChatRoom = ({ onHide, show, user }) => {
  const writtenMessage = useRef();
  const messagesEndRef = useRef(null);
  const { userData, messages, writeMessage } = useData();

  if (messages) {
    messages.sort((a, b) => {
      return a.data().createdAt.seconds - b.data().createdAt.seconds;
    });
  }
  const addMessageIds =
    messages &&
    messages.map((m) => {
      let x = Object.assign(m.data(), { messageId: m.id });
      return x;
    });

  const filteredMessages =
    addMessageIds &&
    addMessageIds.filter(
      (m) => m.sender === user.userId || m.recipient === user.userId
    );

  const confirmMessage = (e) => {
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

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (writtenMessage.current.value.length > 0) {
        writeMessage(writtenMessage.current.value, user.userId);
        e.preventDefault();
        writtenMessage.current.value = "";
      }
    }
  };
  useEffect(() => {
    if (show) {
      scrollToBottom();
    }
  }, [show, messages]);
  return (
    <Modal
      className="chatRoom"
      animation={false}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{height:'100%'}}
    >
      <Modal.Header style={{ height: "80px" }} closeButton>
        <div
          style={{
            display: "flex",
            height: "60px",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <UserPhoto
            size="60px"
            userPhoto={user.smallProfilePhoto}
            user={user.userId}
          />
          <h1 style={{fontSize:'calc(1vw + 100%)'}}>{user.UserName}</h1>
        </div>
        <div
          style={{
            display: "flex",
            height: "60px",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <UserPhoto
            size="60px"
            userPhoto={userData.smallProfilePhoto}
            user={userData.userId}
          />
          <h1 style={{ marginLeft: "auto",fontSize:'calc(1vw + 100%)' }}>{userData.UserName}</h1>
        </div>
      </Modal.Header>
      <Modal.Body style={{ overflowY: "auto" }}>
        <Container className="allMessages">
          {filteredMessages &&
            filteredMessages.map((m) => (
              <Message
                user={user}
                friendId={user.userId}
                key={m.messageId}
                messages={m}
              />
            ))}
          <div style={{ alignSelf: "end" }} ref={messagesEndRef} />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Form className="writeChat" onSubmit={confirmMessage} bsPrefix>
          <button type="button" className="chooseButton" id='close' onClick={onHide}>
            Close
          </button>
          <Form.Group style={{ margin: "0px", width:'100%' }}>
            <Form.Control
              placeholder="shift+enter for new line"
              onKeyDown={onEnterPress}
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
                width: "70%",
                overflowY: "auto",
                margin:'auto'
              }}
            />
          </Form.Group>
          <button className="chooseButton" type="submit" id='submit'>
            Send
          </button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatRoom;
