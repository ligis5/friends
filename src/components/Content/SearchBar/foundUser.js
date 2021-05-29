import React, { useEffect, useState, useRef } from "react";
import UserPhoto from "../userPhoto";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import "./SearchBar.css";

const FoundUser = ({ user }) => {
  const { addFriend, peopleFound } = useData();
  const mounted = useRef(true);
  const [currentStatus, setCurrentStatus] = useState("Add Friend");

  // if any data is found in peopleFound and coresponds to usersId that was searched for, it will set data in status state.
  useEffect(() => {
    peopleFound.forEach((u) => {
      if (user.userId === u.id) {
        mounted.current && setCurrentStatus(u.data().status);
        if (u.data().status === "declined") {
          mounted.current && setCurrentStatus("Add Friend");
        }
      }
    });
    return () => (mounted.current = false);
  }, [peopleFound]);

  const changeStatus = () => {
    switch (currentStatus) {
      case "Add Friend":
        setCurrentStatus("cancel");
        addFriend(user.userId, "Add Friend");
        break;
      case "cancel":
        setCurrentStatus("Add Friend");
        addFriend(user.userId, "cancel");
        break;
      case "confirm":
        setCurrentStatus("friends");
        addFriend(user.userId, "friends");
        break;
      case "friends":
        return;
    }
  };

  return (
    <div className="foundUser">
      <div className="foundUser">
        <UserPhoto size="30px" userPhoto={user.smallProfilePhoto} />
        <h5>{user.UserName}</h5>
      </div>
      <div style={{ width: "max-content", marginLeft: "auto" }}>
        {currentStatus === "confirm" ? (
          <button
            className="requestFriend"
            onClick={() => {
              addFriend(user.userId, "cancel");
              setCurrentStatus("Add Friend");
            }}
          >
            Cancel
          </button>
        ) : (
          <></>
        )}
        <button onClick={changeStatus} className="requestFriend">
          {currentStatus}
        </button>
      </div>
    </div>
  );
};
export default FoundUser;
