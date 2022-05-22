import Link from "next/link";
import Head from "next/head";
import {useEffect, useState} from "react";
import Router, {useRouter} from "next/router";

const MainLayout = ({children}) => {
  const {pathname} = useRouter();
  const isAccessPage = pathname === "/" || pathname === "/posts" ||
    pathname === "/posts/[id]" || pathname === "/about"
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const roleInStorage = window.localStorage.getItem("role");
    setUserRole(roleInStorage);
    if (!roleInStorage && !isAccessPage) {
      Router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>{"Открытый портал"}</title>
      </Head>
      <nav>
        <Link href={"/"}><a>Главная</a></Link>
        <Link href={"/about"}><a>О нас</a></Link>
        <Link href={"/posts"}><a>Статьи</a></Link>
        <Link href={"/profile"}><a>Профиль</a></Link>
        {
          userRole === "admin" && <Link href={"/admin-menu"}><a>Меню админа</a></Link>
        }
      </nav>
      <main>
        {(isAccessPage || userRole || (!userRole && pathname === "/login")) && children}
      </main>
      <style jsx>{`
        nav {
          position: fixed;
          height: 60px;
          left: 0;
          top: 0;
          right: 0;
          background: darkblue;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        nav a {
          color: white;
          font-size: 40px;
          text-decoration: none;
        }
        main {
          margin-block: 60px ;
        }
      
      `}</style>
    </>
  );
};

export default MainLayout;
