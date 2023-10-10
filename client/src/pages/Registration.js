import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import './Users.css';

function Registration(){

    let navigate = useNavigate();

    const initialValues ={
        email:"",
        password:"",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().min(5).max(55).email().required(),
        password: Yup.string().min(6).max(6).required(),
    });

    const onSubmit = (data)=>{
        axios.post("http://localhost:3005/api/users", data).then((response)=>{
            navigate("/login");
            //console.log(response.data);
        });
    };

    return (
        <div className="centerContainer">
            <h2>Registration</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Email: </label>
                    <ErrorMessage name="email" component="span" />
                    <Field className="inputCreatePost" name="email" placeholder="Ex. 123@abc.com"/>
                    
                    <label>password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field className="inputCreatePost" type="password" name="password" placeholder="Your password "/>
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
    
}

export default Registration;