import React, { useState, useRef } from "react";
import LikeDislike from "./LikeDislike";
import { Card, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, Route } from "react-router-dom";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";
import ReactPlayer from "react-player/lazy";
import useObserver from "../../Observer";

const Post = ({ postData }) => {
  const ref = useRef();
  const [postImage, setPostImage] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const { storageRef, deletePost } = useData();
  const onScreen = useObserver(ref);
  const { postPhoto, aboutPost, createdAt, video, user, likes, id } = postData;

  const publishDate = createdAt.toDate().toDateString().substring(4);

  if (postPhoto) {
    storageRef
      .child(postPhoto)
      .getDownloadURL()
      .then((url) => {
        setPostImage(url);
      });
  }

  storageRef
    .child(user.profilePhoto)
    .getDownloadURL()
    .then((url) => {
      setUserPhoto(url);
    });

  return (
    <Card
      ref={ref}
      className="text-center"
      style={{
        width: "600px",
        minWidth: "400px",
        marginTop: "20px",
        color: "aliceblue",
      }}
    >
      <Card.Title style={{ margin: "0", display: "flex" }}>
        <Image
          src={userPhoto}
          roundedCircle
          style={{
            backgroundColor: "rgb(79,59,120)",
            maxWidth: "60px",
            maxHeight: "60",
            border: "1px solid aliceblue",
            boxShadow: "2px 2px aliceblue",
          }}
        />
        <h5 style={{ margin: "auto", paddingRight: "60px" }}>
          Posted by {user.UserName}
        </h5>
      </Card.Title>
      {postImage && onScreen ? <Card.Img variant="top" src={postImage}/> : <></>}
      {video && onScreen ? <ReactPlayer controls={true} width="598px" url={video} /> : <></>}

      <Card.Body style={{ padding: "0" }}>
        <Card.Title style={{ marginTop: "20px" }}>{aboutPost}</Card.Title>
        <Card.Body
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            padding: "0",
            marginTop: "70px",
            justifyContent: "space-between",
          }}
        >
          <button style={{backgroundColor:'aliceblue'}} onClick={() => deletePost(id, postPhoto)}>
             <FontAwesomeIcon icon={faTrash}
           style={{backgroundColor:'aliceblue'}}
            color='rgb(79, 59, 120)'/>
            </button>
          <Card.Body style={{ border: "none", padding: "0" }}>
            <LikeDislike postId={id} likes={likes} />
          </Card.Body>
          <Card.Text
            style={{ display: "flex", padding: "0", paddingRight: "10px" }}
          >
            Date: {publishDate}
          </Card.Text>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default Post;
