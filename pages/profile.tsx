import MainLayout from "../components/MainLayout";
import Router from "next/router";
import {useEffect, useState} from "react";

const Profile = () => {
  const [name, setName] = useState();
  const logout = () => {
    localStorage.clear();
    Router.push("/login");
  }
  useEffect(() => {
    setName(localStorage.name);
  }, [])
  return (
    <MainLayout>
      <h1>Профиль</h1>
      {
        name !== undefined && (
          <>
            <div>
              <span>Имя: </span>
              <span>{name}</span>
            </div>
            <button onClick={logout}>Выйти</button>


          </>
        )}
    </MainLayout>
  );
};

export default Profile;
