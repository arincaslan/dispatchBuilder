import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loginLoading: false,
  user: {
    id: null,
    email: null,
    fullName: null,
    timeCreated: null
  },
  token: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_LOGIN:
      return {...state, loginLoading: true};
    case actionTypes.LOGIN_SUCCESS:
      return {...state, loginLoading: false, user: {id: action.payload.user._id, email: action.payload.user.email, fullName: action.payload.user.fullName, timeCreated: action.payload.user.timeCreated}, token: action.payload.token};
    case actionTypes.LOGIN_FAILED:
      return {...state, loginLoading: false};
    default:
      return state;
  }

}

export default reducer;
