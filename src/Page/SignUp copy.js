import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import firebase from '../config/firebase'

export default function SignUp() {

    const formik = useFormik({

        initialValues: { email: "", password: "" },
        onSubmit: value => {
            console.log('formik', value);
        },

        validate: values => {
            const errors = {};
            if (!values.email) {
                errors.email = "Email Field is Required"
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Email is Invalid"
            }

            if (!values.password) {
                errors.password = "Password Field is Required"
            } else if (values.password.length <= 6) {
                errors.password = "Password must be longer than 6"
            }


            return errors;
        }
    });



    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-600">


                <form className="m-5 w-10/12" onSubmit={formik.handleSubmit}>
                    <h1 className="text-white  w-full text-4xl tracking-widest text-center my-6">SignUp</h1>
                    <div className="w-full my-6">
                        <input
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name={'email'}
                            className="p-2 rounded shadow w-full"
                            placeholder="Email or Username" />

                        {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}

                    </div>

                    <div className="w-full my-6">
                        <input
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                            name={'password'}
                            className="p-2 rounded shadow w-full"
                            placeholder="Password" />
                        {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}

                    </div>

                    <div className="w-full my-10">
                        <button type="submit" className="p-2 rounded shdow w-full bg-yellow-400 text-black">
                            {/* {
                                isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Login"
                            } */}

                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
