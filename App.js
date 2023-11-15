import AppNavigation from "./navigation/appNavigation";
import storage from "./storage/storage";
import React, { useState } from "react";

export const UserIdContext = React.createContext(null);
export default function App() {
  const [userId, setUserId] = useState(null);
  storage.load({
    key: "userId",
  }).then(ret => {
    setUserId(ret.userId);
  }).catch(_ => setUserId(null));
  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      <AppNavigation></AppNavigation>
    </UserIdContext.Provider>
  );
}

