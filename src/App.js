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
import styled from "styled-components";
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



function ProtectedRoute({ authenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/join",
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


  const { isAuthenticated , signUpWithEmail } = useAuth(firebase.auth()); // pass in firebase authentication library function 

  const [open, setOpen] = useState(false);
  const location = useLocation();

  // useEffect(()=> hideHeader, [location.pathname]); 

  /**
   * 
   */
  const handleClick = () => {
    //e.preventDefault();
    setOpen(!open);
  };


  /**
   *hides menu when wrapped div is clicked only if open already 
   */
  const handleWrapperClick = () => {

    //open:setOpen(!open):open
    if (open === true) {
      setOpen(!open);
    }
  }

  /**
   * hides header based on location.pathname
   */
  // let header; 
  // if(location.pathname === "/join"){
  //   header = ""
  // } else {
  //   header = <Header open={open} setOpen={setOpen} handleClick={handleClick} />;
  // }

  return (
    <div>
      <ThemeProvider theme={theme}>
        {location.pathname === "/join" ? "" : <Header open={open} setOpen={setOpen} handleClick={handleClick} />}
        <div onClick={handleWrapperClick} style={{ width: '100%', height: '100vh' }}>
          <GlobalStyles />
          <Switch>
            <ProtectedRoute authenticated={isAuthenticated} exact path="/">
              <Route exact path="/">
                <Dash checkins={checkins} days={15} />
              </Route>
            </ProtectedRoute>
            <Route path="/join">
              <Join signUpWithEmail={signUpWithEmail}/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <ProtectedRoute authenticated={isAuthenticated} exact path="/">
              <Route path="/profile">
                <Profile />
              </Route>
            </ProtectedRoute>
            <ProtectedRoute authenticated={isAuthenticated} exact path="/">
              <Route path="/checkin">
                <Checkin />
              </Route>
            </ProtectedRoute>
            <Route path="*">
              <Unknown />
            </Route>

          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

/**
 * 404 Error function
 */
function Unknown() {
  let location = useLocation();

  const CenteredDiv = styled.div`
      display: flex;
      flex-direction:column;
      align-items: center;
      justify-content: center;
      height:70vh;
      width:100%;    
  `;

  return (
    <CenteredDiv>
      <h1>
        404 Not found
      </h1>
      <h2>
        localhost:3000{location.pathname}
      </h2>
    </CenteredDiv>
  );

}

export default App;
