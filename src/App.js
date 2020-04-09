import React,{ useEffect, Suspense } from 'react';
import './App.css';
import * as firebase from 'firebase/app';
import {useDispatch} from "react-redux";
import DispatchBuilder from './containers/DispatchBuilder/DispatchBuilder';
import InputData from './components/InputData/InputData';
import Layout from './hoc/Layout/Layout';
import {rebuildNodesFromLocalStorage} from "./store/actions/nodes";
import {rebuildPathsFromLocalStorage} from "./store/actions/paths";
import {Route, Switch, Redirect} from 'react-router-dom';


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
      measurementId: "G-1VG8C6HYPK"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // dispatch(mergeNodesForPaths())
    dispatch(rebuildPathsFromLocalStorage())
    dispatch(rebuildNodesFromLocalStorage())
  }, [])

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={InputData} />
          <Route path="/results" exact component={DispatchBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
