import React from "react";
import Home from "../../Page/Home";
import Gallery from "../../Page/Gallery";
import Login from "../../Page/Login";
import SignUp from "../../Page/SignUp";
import Tensorflow from "../../Page/tensorflow";

export default [
    {
        path: '/',
        exact: 'true',
        component: () => <Home />,
        protected: null

    },
    {
        path: '/gallery',
        exact: 'false',
        component: () => <Gallery />,
        protected: 'auth'
    },
    {
        path: '/login',
        exact: 'false',
        component: () => <Login />,
        protected: 'guest'

    },
    {
        path: '/signup',
        exact: 'false',
        component: () => <SignUp />,
        protected: 'guest'

    },
    {
        path: '/tensorflow',
        component: () => <Tensorflow />,
        protected: null

    },
]