import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

const AboutMe = ({ value, name }) => {
  const [edit, setEdit] = useState(true);
  const inputValue = useRef("");
  const { updateUserProfile, userData, getUsers } = useData();
  const [data, setData] = useState({ [name]: value });
  const [upload, setUpload] = useState(false);

  // Here unchanged userData is combined with new userData.
  const x = userData;
  const y = Object.assign(x, data);

  // If user confirms his edit of data user profile gets updated.
  const updateUser = async () => {
    await updateUserProfile(y);
    setUpload(false);
    if (data.UserName)
      if (userData.UserName !== typeof data.UserName) {
        getUsers();
      }
  };

  useEffect(() => {
    if (upload) {
      updateUser();
    }
    return () => setUpload(false);
  }, [upload]);

  const editAboutMe = () => {
    setEdit(false);
  };

  const confirmEdit = () => {
    setEdit(true);
    setData({ [name]: inputValue.current.value });
    setUpload(true);
  };
  const cancelEdit = () => {
    setEdit(true);
  };

  return (
    <Container
      style={{ display: "flex", marginTop: "10px", paddingRight: "0" }}
    >
      <div style={{ display: "flex" }}>
        {name}:
        {edit ? (
          <div style={{ marginLeft: "5px" }}>{value}</div>
        ) : (
          <input style={{ color: "aliceblue" }} ref={inputValue} />
        )}
      </div>
      <div style={{ width: "max-content" }} className="aboutMe-buttonGroup">
        {edit ? (
          <button className="aboutMe-button" onClick={editAboutMe}>
            <FontAwesomeIcon
              className="awesomeAbout"
              icon={faEdit}
              color="aliceblue"
            />
          </button>
        ) : (
          <>
            <button className="aboutMe-button" onClick={confirmEdit}>
              <FontAwesomeIcon
                className="awesomeAbout"
                icon={faCheck}
                color="aliceblue"
              />
            </button>
            <button onClick={cancelEdit} className="aboutMe-button" id="onOff1">
              <FontAwesomeIcon
                className="awesomeAbout"
                icon={faBan}
                color="aliceblue"
              />
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default AboutMe;
