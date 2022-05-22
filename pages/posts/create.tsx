import MainLayout from "../../components/MainLayout";
import {Button, TextField} from "@mui/material";
import {Formik, Form, Field, useField, FieldAttributes} from "formik";
import React from "react";
import Router from "next/router";

const MyTextField: React.FC<FieldAttributes<{}> & {multiline?: boolean, rows?: number}> = ({placeholder, multiline, rows, style, ...props}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField {...field} placeholder={placeholder} multiline={multiline} rows={rows} style={style} helperText={errorText} error={!!errorText}/>
  )
}

const Create = () => {
  return (
    <MainLayout>
      <h1>Создание статьи</h1>
      <Formik
        initialValues={{title: "", text: ""}}
        validate={(values) => {
          const errors: Record<string, string> = {}; // sho tse take
          if (values.title.trim().length === 0) {
            errors.title = "Поле не может быть пустым"
          }
          if (values.text.trim().length === 0) {
            errors.text = "Поле не может быть пустым"
          }
          return errors;
        }}
        onSubmit={async (data, {setSubmitting}) => {
          const author = localStorage.getItem("login")
          const body = {
            author,
            title: data.title,
            text: data.text,
            date: new Date().toISOString()
          }
          console.log(body)
          const response = await fetch("http://localhost:3000/api/posts/create", {
            method: "POST",
            body: JSON.stringify(body)
          })
          const result = await response.json();
          if (result.isSuccess) {
            Router.push('/posts');
          }
          setSubmitting(true);
          console.log(data)
          setSubmitting(false);
        }}
      >{({values, errors, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
        <Form>
          <MyTextField
            name={"title"} placeholder={"Заголовок"}
          />
          <MyTextField
            name={"text"}
            placeholder="Тест статьи"
            multiline={true}
            style={{width: "100%"}}
            rows={6}
          />
          <Button disabled={isSubmitting} type={"submit"}>Опубликовать</Button>
          {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
        </Form>
      )}
      </Formik>

    </MainLayout>
  );
};

export default Create;
