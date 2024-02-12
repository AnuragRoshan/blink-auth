import axios from "axios";
import React from "react";

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/logout`, null, {
        withCredentials: true, // include cookies in the request
      });

      if (response.status === 200) {
        // Logout successful
        console.log("User logged out");
        window.location.href = "/";
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="top-nav">
      <div className="inner-nav">
        {user ? (
          <>
            <div className="auth-nav" onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <div className="auth-nav">Login</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
