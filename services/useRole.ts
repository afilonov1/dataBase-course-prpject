import {useEffect, useState} from "react";
import Router from "next/router";

export const UseRole = () => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const roleInStorage = window.localStorage.getItem("role");
    const loginInStorage = window.localStorage.getItem("login");
    const nameInStorage = window.localStorage.getItem("name");
    setUser({
      role: roleInStorage,
      login: loginInStorage,
      name: nameInStorage,
    });
  }, []);
  return [user]
}
