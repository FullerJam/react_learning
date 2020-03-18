import React, { useState } from "react";
import theme from "./config/theme.js";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./config/globalStyles";

import Dash from "./Views/Dash";
import Join from "./Views/Join";
import Profile from "./Views/Profile";
import Checkin from "./Views/Checkin";
import Login from "./Views/Login";

import Header from "./Components/Header";
import Loader from "./Components/Loader";

import {
  Switch,
  Route,
  useLocation,
  Redirect
} from "react-router-dom";

import useAuth from "./services/firebase/useAuth";
import firebase from "firebase/app";   // the firebase core lib
import 'firebase/auth'; // specific products
import firebaseConfig from "./config/firebase";  // the firebase config 

const checkins = [
  {
    date: "Wed Jan 29 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  {
    date: "Wed Jan 28 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 15
  },
  { date: "Wed Jan 27 2020 07:17:11 GMT+0000 (Greenwich Mean Time)", score: 8 },
  { date: "Wed Jan 26 2020 07:17:11 GMT+0000 (Greenwich Mean Time)", score: 2 },
  {
    date: "Wed Jan 25 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  {
    date: "Wed Jan 23 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 12
  },
  {
    date: "Wed Jan 22 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 19
  },
  {
    date: "Wed Jan 21 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 10
  },
  {
    date: "Wed Jan 20 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 15
  },
  { date: "Wed Jan 19 2020 07:17:11 GMT+0000 (Greenwich Mean Time)", score: 6 },
  {
    date: "Wed Jan 18 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  {
    date: "Wed Jan 17 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  {
    date: "Wed Jan 16 2020 07:17:11 GMT+0000 (Greenwich Mean Time)",
    score: 20
  },
  { date: "Wed Jan 15 2020 07:17:11 GMT+0000 (Greenwich Mean Time)", score: 20 }
];

let initAttemptedRoute = "/"

function ProtectedRoute({ authenticated, children, ...rest }) {

  initAttemptedRoute = useLocation().pathname

  return (
    <Route
      {...rest}
      render={({ location }) => authenticated ? (children) : (<Redirect to={{
        pathname: "/login",
        state: { from: location }
      }}
      />
      )
      }
    />
  );
}

function RedirectToDash({ authenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: initAttemptedRoute,
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


function App() {

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    isAuthenticated,
    signUpWithEmail,
    signInEmailUser,
    signInWithProvider,
    signOut,
    user,
    loading
  } = useAuth(firebase.auth); // pass in firebase authentication library

  const location = useLocation();

  // useEffect(()=> hideHeader, [location.pathname]); 

  /**
   * 
   */
  const handleClick = () => {
    //e.preventDefault();
    setMenuOpen(!menuOpen);
  };


  /**
   *hides menu when wrapped div is clicked only if open already 
   */
  const handleWrapperClick = () => {
    if (menuOpen === true) {
      setMenuOpen(!menuOpen);
    }
  }

  /**
   * hides header based on location.pathname : old solution
   */
  // let header; 
  // if(location.pathname === "/join"){
  //   header = ""
  // } else {
  //   header = <Header menuOpen={open} setMenuOpen={setMenuOpen} handleClick={handleClick} />;
  // }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        {location.pathname === "/join" || "/login" ? "" : <Header open={menuOpen} signOut={signOut} user={user} onClick={handleClick} />}
        <div onClick={handleWrapperClick} style={{ width: '100%', height: '100vh' }}>
          <GlobalStyles/>
          <Switch>
            <ProtectedRoute authenticated={isAuthenticated} exact path="/">
                <Dash checkins={checkins} days={15}/>
            </ProtectedRoute>

            {/* unprotected routes */}
            <RedirectToDash authenticated={isAuthenticated} path="/join">
              <Join signInWithProvider={signInWithProvider} signUpWithEmail={signUpWithEmail} />
            </RedirectToDash>

            <RedirectToDash authenticated={isAuthenticated} path="/login">
              <Login signInWithProvider={signInWithProvider} signInEmailUser={signInEmailUser} />
            </RedirectToDash>
            {/* unprotected routes end */}

            <ProtectedRoute authenticated={isAuthenticated} path="/profile">
                <Profile />
            </ProtectedRoute>

            <ProtectedRoute authenticated={isAuthenticated} path="/checkin">
                <Checkin />
            </ProtectedRoute>
            {/* <Route path="*">
              <Unknown />
            </Route> */} {/*404 wasnt working so commented out*/}
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

/**
 * 404 Error function (stopped working when using protected routes, need to find alternate method)
 */
// function Unknown() {
//   let location = useLocation();

//   const CenteredDiv = styled.div`
//       display: flex;
//       flex-direction:column;
//       align-items: center;
//       justify-content: center;
//       height:70vh;
//       width:100%;    
//   `;

//   return (
//     <CenteredDiv>
//       <h1>
//         404 Not found
//       </h1>
//       <h2>
//         localhost:3000{location.pathname}
//       </h2>
//     </CenteredDiv>
//   );

// }

export default App;
