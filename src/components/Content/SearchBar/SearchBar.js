import React, { useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./SearchBar.css";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import { useLocation } from "react-router-dom";
import FoundUser from "./foundUser";

const SearchBar = () => {
  const { allUsers, userData, peopleFound } = useData();
  const [findUser, setFindUser] = useState("");
  const { pathname } = useLocation();

  const excludeOwner =
    allUsers && userData
      ? allUsers.filter((u) => u.userId !== userData.userId)
      : null;

  const usersFound =
    allUsers && userData
      ? excludeOwner.filter(
          (u) => u.UserName.toLowerCase() === findUser.toLowerCase()
        )
      : null;
  useEffect(() => {
    setFindUser("");
  }, [pathname]);
  return (
    <div className="SearchBar">
      <InputGroup
        style={{
          width: "500px",
          height: "60px",
          marginTop: "15px",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <FormControl
          onChange={(e) => setFindUser(e.target.value)}
          className="search-form"
          style={{
            height: "60px",
            backgroundColor: "rgb(64, 52, 91)",
            color: "aliceblue",
            boxShadow: "2px 2px aliceblue",
          }}
          placeholder="Search by UserName"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
      <div
        style={
          usersFound && usersFound.length > 0
            ? { display: "block" }
            : { display: "none" }
        }
        className="user-list"
      >
        {usersFound ? (
          usersFound.map((user) => <FoundUser key={user.userId} user={user} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
