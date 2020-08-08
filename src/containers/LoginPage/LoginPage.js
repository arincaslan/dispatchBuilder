import React, {useState} from "react";
import Logo from "../../assets/images/login-logo.jpeg"
import {useDispatch} from "react-redux";
import {loginAction} from "../../store/actions/user"
import classes from "./LoginPage.module.scss";

const LoginPage = props => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({username: "", password: ""})
  const handleSubmit = e => {
    e.preventDefault();
    if (formData.username !== "" && formData.password !== "" ) {
        dispatch(loginAction(formData.username, formData.password))
    }
  }

    return <div className={classes.LoginContainer}>
      <div className={classes.LeftContainer}>
        <div className={classes.LeftContainerTop}>

        </div>
        <div className={classes.LeftContainerBottom}>
          <h3 className={classes.LeftContainerBottomHeader}>Welcome</h3>
          <p className={classes.LeftContainerBottomDescription}>Yeah, looks very soft.. but there are some typos and guess you might experiment a bit more with paddings between elements and fonts</p>
        </div>
      </div>
      <div className={classes.RightContainer}>
        <form onSubmit={(e) => handleSubmit(e)} className={classes.FormContainer}>
          <h3 className={classes.LoginHeader}>Login</h3>
          <p className={classes.LoginDescription}>Yeah, looks very soft.. but there are some typos and guess you might experiment a bit</p>
          <input className={classes.Input} value={formData.username} onChange={e => {
            e.persist();
            setFormData(prev => ({...prev, username: e.target.value}))
          }} placeholder="Email" />
          <input type="password" className={classes.Input} value={formData.password} onChange={e => {
            e.persist();
            setFormData(prev => ({...prev, password: e.target.value}))
          }} placeholder="Password" />
          <div className={classes.CheckboxContainer}>
            <div></div>
            <span>Forgot Password?</span>
          </div>
          <button type="submit" className={classes.LoginButton}>LOGIN</button>
        </form>
      </div>
    </div>

}

export default LoginPage;
