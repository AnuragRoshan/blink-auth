import React from "react";
import Login from "../Component/Login";
import Profile from "../Component/Profile";

const Home = (props) => {
  // const user = false;
  const user = props.user;
  console.log(user);
  return (
    <div>
      {user ? (
        <>
          <Profile />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
};

export default Home;
