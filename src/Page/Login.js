import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import firebase from '../config/firebase'

export default function Login() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({ email: "", password: "" })
    // const [isLoging, setIsLoging] = useState(false)


    const history = useHistory()


    function handleForm(e) {
        if (isLoading) return;

        setIsLoading(true)

        e.preventDefault()

        firebase
            .auth()
            .signInWithEmailAndPassword(form.email, form.password)
            .then(res => {
                console.log(res);


                history.replace('/')


                // setIsLoging(true)
                setError("")
                setIsLoading(false)
            })
            .catch(error => {

                setError(error.message)

                setIsLoading(false)
            })
    }

    function handleInput(e) {
        // e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    // if (isLoging) return <Redirect to="/" />

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-600">


                <form className="m-5 w-10/12" onSubmit={handleForm}>
                    {error != "" && <p className="text-white">{error}</p>}
                    <h1 className="text-white  w-full text-4xl tracking-widest text-center my-6">Login</h1>
                    <div className="w-full my-6">
                        <input
                            type="email"
                            value={form.email}
                            onChange={handleInput}
                            name={'email'}
                            className="p-2 rounded shadow w-full"
                            placeholder="Email or Username" />
                    </div>

                    <div className="w-full my-6">
                        <input
                            type="password"
                            value={form.password}
                            onChange={handleInput}
                            name={'password'}
                            className="p-2 rounded shadow w-full"
                            placeholder="Password" />
                    </div>

                    <div className="w-full my-10">
                        <button type="submit" className="p-2 rounded shdow w-full bg-yellow-400 text-black">
                            {
                                isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Login"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
