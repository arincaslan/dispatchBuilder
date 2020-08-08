import * as actionTypes from "./actionTypes";
import {loginService} from "../../services/auth-service.js";
import { push } from 'connected-react-router'

export const loginAction = (username, password) => {
  
  return dispatch => {
    dispatch({type: actionTypes.START_LOGIN})
    loginService(username, password).then(res => {
      dispatch({type: actionTypes.LOGIN_SUCCESS, payload: {user: {_id: res.data.user._id, email: res.data.user.email, fullName: res.data.user.fullName, timeCreated: res.data.user.timeCreated}, token: res.data.token}});
      dispatch(push("/dispatchbuilder"))
    }).catch(err => {
      dispatch({type: actionTypes.LOGIN_FAILED})
    })
  }
}
