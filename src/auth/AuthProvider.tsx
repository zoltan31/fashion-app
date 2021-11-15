import React, { createContext, useState } from "react";
import { useHistory } from "react-router";

type AuthType = {
  authed: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const authContext = createContext({} as AuthType);

function useAuthentication() {
  const [authed, setAuthed] = useState(false);
  const history = useHistory();

  const login = async () => {
    //TODO: Fetch API
    setAuthed(true);
  };

  const logout = async () => {
    //TODO: Fetch API
    setAuthed(false);
    history.replace("/login");
  };

  return {
    authed,
    login,
    logout,
  };
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const auth = useAuthentication();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return React.useContext(authContext);
}
