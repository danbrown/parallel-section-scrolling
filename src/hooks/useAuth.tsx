import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { api } from "@services";

const AuthContext = createContext<any>({});

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === undefined) localStorage.removeItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      const userID = localStorage.getItem("id");
      console.log("userID: ", userID);

      // if (userID !== undefined) {
      //   const { data } = await api.get(`/users/${userID}`);
      //   setSessionUser(data);
      // } else {
      //   setSessionUser({});
      // }
    })();
  }, []);

  async function handleLogin(identifier, password, path = "/dashboard") {
    const response = await api.post("auth/local", {
      identifier,
      password,
    });
    console.log(response);
    // setSessionUser(response.data.user);
    // const { token } = response.data;
    // localStorage.setItem("token", JSON.stringify(token));
    // localStorage.setItem("id", response.data.user.id);
    // api.defaults.headers.Authorization = `Bearer ${token}`;
    // setAuthenticated(true);
    // router.push(path);
  }

  async function handleSignUp(userData, path = "/dashboard") {
    // await api
    //   .post("/users", userData)
    //   .then((result) => {
    //     handleLogin(userData.email, userData.password, path);
    //   })
    //   .catch((error) => {
    //     // ! HANDLE MSG CANT CREATE
    //   });
  }

  async function handleVerify() {}

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    api.defaults.headers.Authorization = undefined;
    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        handleLogin,
        handleLogout,
        handleSignUp,
        handleVerify,
        sessionUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
