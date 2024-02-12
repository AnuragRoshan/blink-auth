import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Page/Home";
import Navbar from "./Component/Navbar";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularLoader from "./Component/CircularLoader";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser();
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
  // const user = true;

  console.log(user);

  return (
    <>
      <Router>
        <Navbar user={user} />
        <>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home user={user} loading={loading} />}
            />

            <Route
              exact
              path="/login"
              element={<Login user={user} loading={loading} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup user={user} loading={loading} />}
            />
          </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
