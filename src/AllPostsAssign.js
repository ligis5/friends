import { useData } from "./components/FirebaseComponents/firebaseFunctionsFiles";
import { useEffect, useState } from "react";
import AllFriendsAssign from "./AllFriendsAssign";

// here we map over all posts and all users and for every post we assign a user that created said post.
const AllPostsAssign = () => {
  const allFriends = AllFriendsAssign();
  const { userPosts, allUsers, userData } = useData();
  const [posts, setPosts] = useState();

  // map existing posts and add user object and post id into post object.
  // if (allFriends) {
  //   const x = allFriends.push(userData);
  //   console.log(x);
  // }
  // console.log(allFriends);
  useEffect(() => {
    let mounted = true;
    if (allFriends) {
      const postsWithUsers = allUsers.map((y) => {
        const usersAssignedToPosts = userPosts.map((x) => {
          if (y.userId === x.data().userId) {
            const q = Object.assign(x.data(), { id: x.id });
            const z = Object.assign(q, { user: y });
            return z;
          }
        });
        return usersAssignedToPosts;
      });
      const noUndefined = postsWithUsers.flat().filter((post) => post);

      if (noUndefined && mounted) setPosts(noUndefined);
    }

    return () => (mounted = false);
  }, [userPosts, allFriends]);

  // sort by time created and then reverse, so newest posts would be on top.
  posts &&
    posts.sort((a, b) => {
      return a.createdAt.seconds - b.createdAt.seconds;
    });
  posts && posts.reverse();
  return posts;
};

export default AllPostsAssign;
