import MainLayout from "../../components/MainLayout";
import Link from "next/link";
import styles from "../../styles/posts.module.scss";
import {UseRole} from "../../services/useRole";
import {Button} from "@mui/material";
import {useState} from "react";

export default function Posts({posts = []}) {
  const [renderPosts, setRenderPosts] = useState(posts);
  const [user] = UseRole();
  const handleDelete = (id) => {
    console.log(id)
    fetch("http://localhost:3000/api/posts/delete", {
      method: "DELETE",
      body: JSON.stringify(id)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.isSuccess) {
          console.log(result, 2)
          setRenderPosts(result.posts)
        }
      })
  }
  console.log(posts)
  return (
    <MainLayout>
      <h1>Статьи</h1>
      <Link href={"/posts/create"}><a>Создать пост</a></Link>
      {renderPosts.map(item => {
        const date = new Date(item.date).toDateString();
        return (
        <div key={item.id} className={styles.postWrap}>
          <Link href={`/posts/${item.id}`}><a>Комментарии</a></Link>
          {
            (user.login === item.author || user.role === "admin") && (
              <Button onClick={() => handleDelete(item.id)}>Удалить пост</Button>
            )
          }
          <p className={styles.author}>{item.author}</p>
          <p className={styles.date}>{date}</p>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.text}>{item.text}</p>
        </div>
      )})}

    </MainLayout>
  )
}


export const getServerSideProps = async (context) => {
  if (!context.req) {
    return {
      props: {}
    }
  }
  const result = await fetch("http://localhost:3000/api/posts", {
    method: "GET"
  });
  // console.log(result)
  const posts = await result.json()
  return {props: {posts}};
}
