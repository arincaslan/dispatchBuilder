import React, { useEffect, Suspense } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import { useDispatch } from "react-redux";

//Routes
import DispatchBuilder from "./containers/DispatchBuilder/DispatchBuilder";
import DynamicDispatchBuilder from "./containers/DynamicDispatchBuilder/DynamicDispatchBuilder";
import InputData from "./components/InputData/InputData";
import DynamicInputData from "./components/DynamicInputData/DynamicInputData";
import DynamicInputDataGP from "./components/DynamicInputDataGP/DynamicInputDataGP";
import DynamicInputDataTrucksPage from "./components/DynamicInputDataTrucksPage/DynamicInputDataTrucksPage";
import DynamicInputDataElementsPage from "./components/DynamicInputDataElementsPage/DynamicInputDataElementsPage";
import DynamicInputDataDischargePage from "./components/DynamicInputDataDischargePage/DynamicInputDataDischargePage";
import DynamicInputDataFinalPage from "./components/DynamicInputDataFinalPage/DynamicInputDataFinalPage";
import TraditionalTruckData from "./components/InputData/TraditionalTruckData";
import HomePage from "./containers/HomePage/HomePage";
import Layout from "./hoc/Layout/Layout";

//Rebuild From Storage
import { rebuildNodesFromLocalStorage } from "./store/actions/nodes";
import { rebuildPathsFromLocalStorage } from "./store/actions/paths";
import { rebuildTrucksFromLocalStorage } from "./store/actions/trucks";
import { rebuildDynamicTrucksFromLocalStorage } from "./store/actions/dynamicTrucks";
import { rebuildDynamicNodesFromLocalStorage } from "./store/actions/dynamicNodes";
import { rebuildDynamicPathsFromLocalStorage } from "./store/actions/dynamicPaths";
import { rebuildDynamicPathCostsFromLocalStorage } from "./store/actions/dynamicPathCosts";
import { rebuildDynamicShowelsFromLocalStorage } from "./store/actions/dynamicShowels";
import { rebuildDynamicCrushersFromLocalStorage } from "./store/actions/dynamicCrushers";
import { rebuildDynamicOreDepotsFromLocalStorage } from "./store/actions/dynamicOreDepots";
import { rebuildDynamicDischargesFromLocalStorage } from "./store/actions/dynamicDischarges";
import { rebuildDynamicFinalsFromLocalStorage } from "./store/actions/dynamicFinal";
//
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./containers/LoginPage/LoginPage";
// import "./assets/vendor/amchart-core";
// import "./assets/vendor/amchart";
// import "./assets/vendor/animated";

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

    dispatch(rebuildPathsFromLocalStorage());
    dispatch(rebuildNodesFromLocalStorage());
    dispatch(rebuildDynamicTrucksFromLocalStorage());
    dispatch(rebuildDynamicNodesFromLocalStorage());
    dispatch(rebuildDynamicPathsFromLocalStorage());
    dispatch(rebuildDynamicPathCostsFromLocalStorage());
    dispatch(rebuildDynamicShowelsFromLocalStorage());
    dispatch(rebuildDynamicCrushersFromLocalStorage());
    dispatch(rebuildDynamicOreDepotsFromLocalStorage());
    dispatch(rebuildDynamicDischargesFromLocalStorage());
    dispatch(rebuildTrucksFromLocalStorage());
    dispatch(rebuildDynamicFinalsFromLocalStorage());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Layout>
          <Route path="/dispatchbuilder" exact component={InputData} />
          <Route
            path="/dynamicdispatchbuilderelementspage"
            exact
            component={DynamicInputDataElementsPage}
          />
          <Route
            path="/dynamicdispatchbuildertruckspage"
            exact
            component={DynamicInputDataTrucksPage}
          />
          <Route
            path="/dynamicdispatchbuilder"
            exact
            component={DynamicInputData}
          />
          <Route
            path="/dynamicdispatchbuildergp"
            exact
            component={DynamicInputDataGP}
          />
          <Route
            path="/dynamicdispatchbuilderdischargepage"
            exact
            component={DynamicInputDataDischargePage}
          />
          <Route
            path="/dynamicdispatchbuilderfinalpage"
            exact
            component={DynamicInputDataFinalPage}
          />
          <Route path="/truckbuilder" exact component={TraditionalTruckData} />
          <Route path="/results" exact component={DispatchBuilder} />
          <Route
            path="/dynamicresults"
            exact
            component={DynamicDispatchBuilder}
          />
        </Layout>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
