import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import firebase from '../config/firebase'
import AppContext from '../store/AppContext'

export default function Header() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [isLoggedIn, user] = useContext(AppContext)

    const history = useHistory()

    function logout() {
        firebase.auth().signOut().then(res => {
            // setIsLoggedIn(false)
            history.replace('/login')
        }).catch(e => {
            console.log(e.response.data);
        })
    }
    return (
        <nav className="py-5 bg-gray-900 text-white flex justify-between px-10">
            <ul className="flex justify-between px-10">
                <li className="mr-5">
                    <NavLink to="/" exact={true} activeClassName={'underline'}>Home</NavLink>
                </li>
                <li className="mr-5">
                    <NavLink to="/gallery" activeClassName={'underline'}>Gallery</NavLink>
                </li>

                <li className="mr-5">
                    <NavLink to="/tensorflow" activeClassName={'underline'}>Tensorflow</NavLink>
                </li>

            </ul>
            <ul className="flex justify-between px-10">
                <li className="mr-5">
                    {isLoggedIn ? <button onClick={logout}>Logout</button> : <NavLink to="/login" activeClassName={'underline'}>Login</NavLink>}
                </li>
                {!isLoggedIn &&
                    <li className="mr-5">
                        <NavLink
                            to="/signup"
                            activeClassName={'underline'}>
                            SignUp
                        </NavLink>
                    </li>
                }

            </ul>
        </nav>
    )
}
