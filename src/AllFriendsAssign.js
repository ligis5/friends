import { useData } from "./components/FirebaseComponents/firebaseFunctionsFiles";
import { useEffect, useState } from "react";

const AllFriendsAssign = () => {
  const { allUsers, peopleFound, addFriend } = useData();
  const [friends, setFriends] = useState();

  //
  useEffect(() => {
    let mounted = true;
    //peopleFound has array of objects that contains users id that sent friend request or are friends and what is status of friend request.If matching id is found in allUsers then that users status is added.
    const myFriends = peopleFound.map((p) => {
      if (p.data().status === "declined") {
        mounted && addFriend(p.id, "declined");
      }
      const filterToFriends = allUsers.filter((u) => {
        if (u.userId === p.id) {
          const y = Object.assign(u, p.data());
          return y;
        }
      });
      return filterToFriends;
    });
    if (myFriends && mounted) setFriends(myFriends.flat());

    return () => (mounted = false);
  }, [peopleFound, allUsers]);

  return friends;
};

export default AllFriendsAssign;
