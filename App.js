import AppNavigation from "./navigation/AppNavigation";
import storage from "./storage/storage";
import React, { useState } from "react";
import Toast, { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";
import { theme } from "./theme";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: theme.iconOnG,
        borderLeftWidth: 10,
        width: "90%",
        height: 70,
        borderRightColor: theme.iconOnG,
        borderRightWidth: 10,
        borderRadius: 20,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  /*
    Overwrite 'info' type,
    by modifying the existing `InfoToast ` component
  */
  info: (props) => (
    <InfoToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: theme.iconOff,
        borderLeftWidth: 10,
        width: "90%",
        height: 70,
        borderRightColor: theme.iconOff,
        borderRightWidth: 10,
        borderRadius: 20,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: theme.decrementButton,
        borderLeftWidth: 10,
        width: "90%",
        height: 70,
        borderRightColor: theme.decrementButton,
        borderRightWidth: 10,
        borderRadius: 20,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};
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
      <Toast config={toastConfig} />
    </UserContext.Provider>
  );
}

