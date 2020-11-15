import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loading from '../../components/Loading'
import AnimatedRoute from '../routes/AnimatedRoute'
import AppContext from '../../store/AppContext'

export default function GuestRoute({ children, ...rest }) {

    const [isLoggedIn] = useContext(AppContext)

    // if (isLoggedIn === null) return <Loading />
    if (!isLoggedIn) return <AnimatedRoute {...rest}>{children}</AnimatedRoute>

    return <Redirect to='/' />
}
