import React, { useEffect, useState } from "react";
import UserPhoto from "../userPhoto";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import "./SearchBar.css";

const FoundUser = ({ user }) => {
  const { addFriend, peopleFound } = useData();
  const [status, setStatus] = useState("Add Friend");

  //fix else setStatus
  // if any data is found in peopleFound and coresponds to usersId that was searched for, it will set data in status state.
  useEffect(() => {
    peopleFound.forEach((u) => {
      if (user.userId === Object.keys(u.data())[0]) {
        setStatus(Object.values(u.data())[0]);
        if (Object.values(u.data())[0] === "declined") {
          addFriend(user.userId, "declined");
          setStatus("Add Friend");
        }
      }
    });
  }, [peopleFound]);

  const changeStatus = () => {
    switch (status) {
      case "Add Friend":
        setStatus("cancel");
        addFriend(user.userId, "Add Friend");
        break;
      case "cancel":
        setStatus("Add Friend");
        addFriend(user.userId, "cancel");
        break;
      case "confirm":
        setStatus("friends");
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
        {status === "confirm" ? (
          <button
            className="requestFriend"
            onClick={() => {
              addFriend(user.userId, "cancel");
              setStatus("Add Friend");
            }}
          >
            Cancel
          </button>
        ) : (
          <></>
        )}
        <button onClick={changeStatus} className="requestFriend">
          {status}
        </button>
      </div>
    </div>
  );
};
export default FoundUser;
