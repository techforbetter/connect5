import axios from 'axios';
import { Modal } from 'antd';
import {
  ADD_SESSION_SUCCESS,
  GET_SESSION_DETAILS_BY_SHORT_ID,
  UPDATE_ATTENDEES_SUCCESS,
  LOADING_START,
  LOADING_END,
} from '../constants/actionTypes';

import history from '../history';
import store from '../store';

import { fetchSessionDetails } from './groupSessionsAction';

export const createSessionAction = sessionData => dispatch => {
  dispatch({
    type: LOADING_START,
  });

  axios
    .post('/api/add-session', sessionData)
    .then(res => {
      dispatch({
        type: ADD_SESSION_SUCCESS,
        payload: res.data,
      });
    })
    .then(() => {
      const { role } = store.getState().auth;

      Modal.success({
        title: 'Done!',
        content: 'Session created',
        onOk: () =>
          history.push(role === 'trainer' ? 'trainer-sessions' : '/sessions'),
      });
    })
    .catch(err => {
      dispatch({
        type: LOADING_END,
      });

      return Modal.error({
        title: 'Error',
        content: err,
        onOk: history.push('/create-session'),
      });
    });
};

export const getSessionDetails = shortId => dispatch => {
  axios
    .get(`/api/sessions?shortId=${shortId}`, shortId)
    .then(res =>
      dispatch({
        type: GET_SESSION_DETAILS_BY_SHORT_ID,
        payload: res.data,
      })
    )
    .catch(err => {
      if (err.response.status === 404) {
        return Modal.error({
          title: 'Session Not Found!',
          content: 'The session You are looking for is not avaliable',
          onOk: () => history.push('/404err'),
        });
      }
      return history.push('/500err');
    });
};

export const updateSessionAttendeesList = ({
  sessionId,
  attendeesList,
  status,
  handleCloseDrawer,
}) => dispatch => {
  // start loading
  dispatch({
    type: LOADING_START,
  });

  axios
    .patch(`/api/sessions/${sessionId}/attendeesList`, {
      attendeesList,
      status,
    })
    .then(res => {
      dispatch({
        type: UPDATE_ATTENDEES_SUCCESS,
        payload: res.data,
      });

      Modal.success({
        title: 'Done!',
        content: 'Attendees List updated succesfully',
        onOk: handleCloseDrawer,
      });

      return dispatch(fetchSessionDetails(sessionId));
    })
    .catch(error => {
      // end loading
      dispatch({
        type: LOADING_END,
      });
      return Modal.error({
        title: 'Error!',
        content: error.response.data.error,
        onOk: handleCloseDrawer,
      });
    });
};

export const sendEmailReminder = (
  { sessionId, ...emailData },
  handleCloseDrawer
) => dispatch => {
  // start loading
  dispatch({
    type: LOADING_START,
  });

  axios
    .post(`/api/sessions/${sessionId}/emails?type=reminder`, emailData)
    .then(res => {
      dispatch({
        type: UPDATE_ATTENDEES_SUCCESS,
        payload: res.data,
      });

      Modal.success({
        title: 'Done!',
        content: 'Emails successfully have been sent',
        onOk: handleCloseDrawer,
      });

      return dispatch(fetchSessionDetails(sessionId));
    })
    .catch(error => {
      // end loading
      dispatch({
        type: LOADING_END,
      });

      return Modal.error({
        title: 'Error!',
        content: error.response.data.error,
        onOk: handleCloseDrawer,
      });
    });
};
