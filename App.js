import AppNavigation from "./navigation/appNavigation";
import storage from "./storage/storage";
import React, { useState } from "react";

export const UserContext = React.createContext(null);
export default function App() {
  const [user, setUser] = useState(null);
  storage.load({
    key: "user",
  }).then(ret => {
    setUser(ret.user);
  }).catch(_ => setUser(null));
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigation></AppNavigation>
    </UserContext.Provider>
  );
}

