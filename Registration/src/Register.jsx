import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
    email: Yup.string()
    .email("Invalid email format")
    .required("Required"),
    password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const res = await fetch(`http://localhost:5000/users?email=${values.email}`);
      const users = await res.json();

      if (users.length > 0) {
        setStatus("Email already exists");
        setSubmitting(false);
        return;
      }

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      setStatus("Registration Successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setStatus("Error occurred. Try again.");
    }
    setSubmitting(false);
  };

  return (
    <Formik 
    initialValues={initialValues} 
    validationSchema={validationSchema} 
    onSubmit={handleSubmit}>
        <Form>
          <Field type="text" name="username" placeholder="Username" />
          <ErrorMessage name="username" component="p" />
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="p" />
          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="p" />
          <button type="submit">Register</button>
        </Form>
    </Formik>
  );
};

export default Register;
