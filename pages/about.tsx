import Router from "next/router";
import MainLayout from "../components/MainLayout";

export default function About() {
  const linkClickHandler = () => {
    Router.push("/");
  }

  return (
    <MainLayout>
    <h1>У нас можно писать развернутые посты</h1>
      <button onClick={linkClickHandler}>На главную страницу</button>
    </MainLayout>
  )
}

