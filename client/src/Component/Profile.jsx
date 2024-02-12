import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularLoader from "./CircularLoader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 1500);
  }, []);
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getUser", {
        withCredentials: true,
      });
      setUser(response.data);
      if (response.data) {
        setLoading(false);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error); // handle error here
    }
  };

  console.log(user);
  // Once user data is available, render the profile content
  return (
    <div>
      {user ? (
        <div
          className="profile"
          style={{
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            fontWeight: "bold",
          }}
        >
          <div style={{ width: "13rem", padding: "2rem" }}>
            <img src={`../Images/${user.image}`} alt={user.image} srcset="" />
          </div>
          <div>Hey {user.name}</div>
          <div>Your Email is {user.username}</div>
        </div>
      ) : (
        <>
          <CircularLoader />
        </>
      )}
      {/* Render profile content using user data */}
    </div>
  );
};

export default Profile;
