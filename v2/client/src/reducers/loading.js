import * as types from '../constants/actionTypes';

const initState = {
  addTrainerLoading: false,
  changePasswordLoading: false,
  forgetPasswordLoading: false,
  resetPasswordLoading: false,
  loginLoading: false,
  loginParticipantsLoading: false,
  sessionEditLoading: false,
  signupLoading: false,
};

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOADING_TRUE:
      return { ...initState, [payload]: true };

    case types.LOADING_FALSE:
      return { ...initState, [payload]: true };

    default:
      return state;
  }
};
