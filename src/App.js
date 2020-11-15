import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import routes from "./utils/routes/index";
import "./assets/style.css";
import Header from "./components/Header";
import firebase from './config/firebase'
import AppContext from "./store/AppContext";
import AuthRoute from "./utils/routes/AuthRoute";
import GuestRoute from "./utils/routes/GuestRoute";
import Loading from "./components/Loading";
import NotFound from "./Page/404";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedRoute from "./utils/routes/AnimatedRoute";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation();


  useEffect(() => {
    setIsLoading(true)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
        setUser(user)
        setIsLoading(false)

      } else {
        setIsLoggedIn(false)
        setUser({})
        setIsLoading(false)

      }
      console.log(user);
    })
  }, [])

  if (isLoading) return <Loading />



  return (
    <AppContext.Provider value={[isLoggedIn, user]}>
      <Header />
      <AnimatePresence exitBeforeEnter initial={false}>

        <Switch key={location.pathname} location={location}>
          {routes.map((route, index) => {

            if (route.protected === 'guest') {
              return (
                <GuestRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                >
                  <route.component />
                </GuestRoute>
              )
            }

            if (route.protected === 'auth') {
              return (
                <AuthRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                >
                  <route.component />
                </AuthRoute>
              )
            }



            return (
              <AnimatedRoute
                key={index}
                path={route.path}
                exact={route.exact}
              >
                <route.component />
              </AnimatedRoute>
            )


          })}
          <Route
            path={'*'}
          >
            <NotFound />
          </Route>

        </Switch>

      </AnimatePresence>

    </AppContext.Provider>
  )
}

export default App;
