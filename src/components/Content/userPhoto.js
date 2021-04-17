import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";

const UserPhoto = ({ user, userPhoto, size }) => {
  const { storageRef } = useData();
  const history = useHistory();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    storageRef
      .child(userPhoto)
      .getDownloadURL()
      .then((url) => {
        setPhoto(url);
      });
  }, [user]);
  return (
    <Image
      onClick={() =>
        user === undefined ? null : history.push(`/profile/${user}`)
      }
      src={photo}
      roundedCircle
      style={{
        cursor: "pointer",
        backgroundColor: "rgb(79,59,120)",
        width: size,
        height: size,
        objectFit: "cover",
        border: "1px solid black",
        boxShadow: "1px 1px black",
      }}
    />
  );
};
export default UserPhoto;
