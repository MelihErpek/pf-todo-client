import React, { useState } from "react";
import Router from "./Router/Router";
import Nav from "./Components/Nav";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  return (
    <div>
      <AuthContextProvider value={{ userData, setUserData }}>
        <Nav />
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
