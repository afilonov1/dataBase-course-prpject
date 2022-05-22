import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {TextField, Button} from '@mui/material';
import styles from "../styles/login.module.scss";
import MainLayout from "../components/MainLayout";
import Router from "next/router";

const Login = () => (
  <MainLayout>
    <div className={styles.wrapper}>
      <h1>Авторизоваться на портале</h1>
      <Formik initialValues={{login: "", password: ""}} onSubmit={(data, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        console.log(data)
        setSubmitting(false);
        // resetForm();
        fetch('http://localhost:3000/api/login', {
          method: "POST",
          body: JSON.stringify({
            login: data.login,
            password: data.password
          })
        })
          .then(response => response.json())
          .then(result => {
            console.log(result)
            localStorage.setItem("isAuth", result.isAuth);
            localStorage.setItem("login", result.login);
            localStorage.setItem("role", result.role);
            localStorage.setItem("name", result.name);
            if (result.isAuth) {
              Router.push("/");
            }
          })
      }}

      >{(props) => (
        <form onSubmit={props.handleSubmit} className={styles.form}>
          <Field placeholder="Логин" name={"login"} as={TextField}/>
          <Field placeholder="Пароль" name={"password"} as={TextField}/>

          {/*<pre>{JSON.stringify(props.values, null, 2)}</pre>*/}
          <Button disabled={props.isSubmitting} type="submit">Войти</Button>
        </form>

      )}</Formik>
    </div>
  </MainLayout>
);

export default Login;
