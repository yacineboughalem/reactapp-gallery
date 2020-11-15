import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loading from '../../components/Loading'
import AppContext from '../../store/AppContext'
import AnimatedRoute from './AnimatedRoute'

export default function AuthRoute({ children, ...rest }) {

    const [isLoggedIn] = useContext(AppContext)
    // if (isLoggedIn === null) return <Loading /> 

    if (isLoggedIn) return <AnimatedRoute {...rest} >{children}</AnimatedRoute>

    return (
        <AnimatedRoute>
            <Redirect to='/login' />
        </AnimatedRoute>)
}
