import React, { useState, useRef, useEffect } from "react";
import LikeDislike from "./LikeDislike";
import {
  Card,
  Image,
  OverlayTrigger,
  Popover,
  Row,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import { useAuth } from "../../FirebaseComponents/firebaseFunctionsAuth";
import ReactPlayer from "react-player/lazy";
import useObserver from "../../../Observer";

const Post = ({ postData }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const params = useParams();
  const ref = useRef();
  const { currentUser } = useAuth();
  const [postImage, setPostImage] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [hidePopup, setHidePopup] = useState();
  const [show, setShow] = useState(true);
  const { storageRef, deletePost } = useData();
  const onScreen = useObserver(ref);

  const { postPhoto, aboutPost, createdAt, video, user, likes, id } = postData;

  const publishDate = createdAt.toDate().toDateString().substring(4);

  useEffect(() => {
    if (postPhoto) {
      if (pathname === "/profile" || pathname === `/profile/${params.user}`) {
        setShow(false);
      } else {
        setShow(true);
      }
      storageRef
        .child(postPhoto)
        .getDownloadURL()
        .then((url) => {
          storageRef
            .child(user.profilePhoto)
            .getDownloadURL()
            .then((url) => {
              setUserPhoto(url);
            });
          setPostImage(url);
        });
    }
    return () => {
      setPostImage();
      setUserPhoto();
    };
  }, [postPhoto]);

  const deletePostClick = () => {
    deletePost(id, postPhoto);
    setHidePopup(false);
  };

  return (
    <div ref={ref}>
      {onScreen ? (
        <Card
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
              onClick={() => history.push(`/profile/${user.userId}`)}
              src={userPhoto}
              roundedCircle
              style={{
                cursor: "pointer",
                backgroundColor: "rgb(79,59,120)",
                width: "60px",
                height: "60px",
                objectFit: "cover",
                border: "1px solid aliceblue",
                boxShadow: "2px 2px aliceblue",
              }}
            />
            <h5 style={{ margin: "auto", paddingRight: "60px" }}>
              Posted by {user.UserName}
            </h5>
          </Card.Title>
          {postImage ? (
            <a href={postImage} target="_blank" rel="noreferrer">
              <Card.Img
                style={{ maxHeight: "600px", objectFit: "cover" }}
                variant="top"
                src={postImage}
              />
            </a>
          ) : (
            <></>
          )}
          {video ? (
            <ReactPlayer controls={true} width="598px" url={video} />
          ) : (
            <></>
          )}

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
              {" "}
              {currentUser.uid === user.userId ? (
                <OverlayTrigger
                  show={hidePopup}
                  trigger="click"
                  key="left"
                  placement="left"
                  overlay={
                    <Popover id={"popover-positioned-left"}>
                      <Popover.Title
                        style={{ fontSize: "large", color: "rgb(79, 59, 120)" }}
                        as="h3"
                      >
                        Delete this post?
                      </Popover.Title>
                      <Popover.Content>
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            bsPrefix="chooseButton"
                            onClick={() => setHidePopup(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            bsPrefix="chooseButton"
                            onClick={deletePostClick}
                          >
                            Confirm
                          </Button>
                        </Row>
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <button
                    style={{ backgroundColor: "aliceblue" }}
                    onClick={() => setHidePopup(true)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ backgroundColor: "aliceblue" }}
                      color="rgb(79, 59, 120)"
                    />
                  </button>
                </OverlayTrigger>
              ) : (
                <div></div>
              )}
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
      ) : (
        <div style={{ height: "600px" }}>
          <h1>...Loading</h1>
        </div>
      )}
    </div>
  );
};

export default Post;
