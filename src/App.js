import React, { useEffect, Suspense } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import { useDispatch } from "react-redux";
import DispatchBuilder from "./containers/DispatchBuilder/DispatchBuilder";
import InputData from "./components/InputData/InputData";
import TraditionalTruckData from "./components/InputData/TraditionalTruckData";
import HomePage from './containers/HomePage/HomePage';
import Layout from "./hoc/Layout/Layout";
import { rebuildNodesFromLocalStorage } from "./store/actions/nodes";
import { rebuildPathsFromLocalStorage } from "./store/actions/paths";
import { rebuildTrucksFromLocalStorage } from "./store/actions/trucks";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./containers/LoginPage/LoginPage";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#65B8F9",
      // dark: will be calculated from palette.primary.main,
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBeC79KLnDn_H3N-jOsKjpfDpvaN6zv1dI",
      authDomain: "react-dispatch.firebaseapp.com",
      databaseURL: "https://react-dispatch.firebaseio.com",
      projectId: "react-dispatch",
      storageBucket: "react-dispatch.appspot.com",
      messagingSenderId: "520203737746",
      appId: "1:520203737746:web:3e12dd62b9d35fdf08644b",
      measurementId: "G-1VG8C6HYPK",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // dispatch(mergeNodesForPaths())
    dispatch(rebuildPathsFromLocalStorage());
    dispatch(rebuildNodesFromLocalStorage());
    dispatch(rebuildTrucksFromLocalStorage());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>

        <Switch>

          <Route path="/" exact component={LoginPage} />
          <Layout>
              <Route path="/dispatchbuilder" exact component={InputData} />
              <Route path="/truckbuilder" exact component={TraditionalTruckData} />
              <Route path="/results" exact component={DispatchBuilder} />
          </Layout>
        </Switch>

    </ThemeProvider>
  );
}

export default App;
