import Router, {useRouter} from "next/router";
import MainLayout from "../../components/MainLayout";
import {Button} from "@mui/material";
import {UseRole} from "../../services/useRole";
import {FormEvent, useState} from "react";

export default function Post({post, comments}: any) {
  const router = useRouter();
  const postId = +router.query.id;
  const [renderComments, setRenderComments] = useState(comments);
  const [user] = UseRole();
  const handleDelete = (id) => {
      fetch(`http://localhost:3000/api/comment?id=${id}`, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.isSuccess) {
            console.log(result, 2)
            setRenderComments(result.comments)
          }
        })
  }
  return (
    <MainLayout>
      <h1>{post.title}</h1>
      <p>Автор - {post.author}</p>
      <p>Дата - {new Date(post.date).toDateString()}</p>
      <p>Текст - {post.text}</p>
      <p>Комментарии</p>
      {renderComments.map(comment => comment.post_id === postId && (
        <div key={comment.id}>
          <h2>Комментарий</h2>
          <p>Автор - {comment.author}</p>
          <p>Текст - {comment.text}</p>
          {
            (user.login === comment.author || user.role === "admin") && (
              <Button onClick={() => handleDelete(comment.id)}>Удалить пост</Button>
            )
          }
        </div>
      ))}
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (!user.login) {
          Router.push("/login");
          return;
        }
        // @ts-ignore
        const text = e.target.children[1].value;
        const body = {
          author: user.login,
          text,
          post_id: postId
        }
        console.log(body)
        const response = await fetch("http://localhost:3000/api/comment", {
          method: "POST",
          body: JSON.stringify(body)
        })
        const result = await response.json();
        if (result.isSuccess) {
          setRenderComments(result.comments)
        }

      }}>
        <h3>Добавить комментарий</h3>
        <textarea/>
        <button type={"submit"}>Отправить</button>
      </form>
    </MainLayout>
  )
}
export const getServerSideProps = async (context) => {
  const postId = context.query.id;
  if (!context.req) {
    return {
      props: {}
    }
  }
  const resultPost = await fetch(`http://localhost:3000/api/post?id=${postId}`, {
    method: "GET"
  });
  const post = await resultPost.json()
  const resultComments = await fetch(`http://localhost:3000/api/comments?id=${postId}`, {
    method: "GET"
  });
  const comments = await resultComments.json()

  return {props: {post, comments}};
}
