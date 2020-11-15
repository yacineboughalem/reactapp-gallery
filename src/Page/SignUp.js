import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import { Redirect, useHistory } from 'react-router-dom'

import firebase from '../config/firebase'

export default function SignUp() {

    const history = useHistory();


    return (

        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(value, formikBag) => {

                firebase.auth()
                    .createUserWithEmailAndPassword(value.email, value.password)
                    .then(res => {
                        history.replace('/')
                    })
                    .catch(function (e) {

                        // console.log(e.error) 

                        formikBag.setFieldError('email', e.message)
                    });



            }}

            validationSchema={Yup.object({
                email: Yup.string().required('Email is Required').email('Email is invalid'),
                password: Yup.string().required('Password is Required').min(6),

            })}
        >


            <div className="flex h-screen bg-gray-200">
                <div className="m-auto w-1/3 flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-600">
                    <Form className="m-5 w-10/12" >
                        <h1 className="text-white  w-full text-4xl tracking-widest text-center my-6">SignUp</h1>
                        <div className="w-full my-6">
                            <Field
                                name='email'
                                type="email"
                                className="p-2 rounded shadow w-full"
                                placeholder="Email or Username"
                            />
                            <ErrorMessage name='email' />
                        </div>

                        <div className="w-full my-6">
                            <Field
                                name="password"
                                type="password"
                                className="p-2 rounded shadow w-full"
                                placeholder="Password"
                            />
                            <ErrorMessage name='password' />
                        </div>

                        <div className="w-full my-10">
                            <button type="submit" className="p-2 rounded shdow w-full bg-yellow-400 text-black">
                                {/* {
                                isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Login"
                            } */}

                            Sign Up
                        </button>
                        </div>
                    </Form>
                </div>
            </div>
        </Formik>
    )
}
