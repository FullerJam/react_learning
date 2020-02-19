import React from "react";
import theme from "./config/theme.js";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./config/globalStyles";
import Dash from "./Views/Dash";
import Join from "./Views/Join";
import Profile from "./Views/Profile";
import Checkin from "./Views/Checkin";
import Header from "./Components/Header";
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";

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

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <GlobalStyles />
        <Switch>
         
          <Route exact path="/">
            <Dash checkins={checkins} days={15} />
          </Route>
          <Route path="/join">
            <Join/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/checkin">
            <Checkin/>
          </Route>

        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
