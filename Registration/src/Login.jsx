import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
    .email("Invalid email format")
    .required("Required"),
    password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
  });

  const handleSubmit = async (values, { setStatus }) => {
    try {
      const res = await fetch(`http://localhost:5000/users?email=${values.email}`);
      const users = await res.json();

      if (users.length === 0 || users[0].password !== values.password) {
        setStatus("Invalid Credentials");
        return;
      }

      localStorage.setItem("userID", users[0].id);
      navigate("/dashboard");
    } catch (error) {
      setStatus("Login failed. Try again.");
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="p" />
          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="p" />
          <button type="submit">Login</button>
        </Form>
    </Formik>
  );
};

export default Login;
