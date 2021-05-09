import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './auth-actions';

const {
    registerRequest,
    registerSuccess,
    registerError,
    loginRequest,
    loginSuccess,
    loginError,
    logoutRequest,
    logoutSuccess,
    logoutError,
    getCurrentUserRequest,
    getCurrentUserSuccess,
    getCurrentUserError,
} = authActions;

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
    [registerSuccess]: (_, { payload }) => payload.user,
    [loginSuccess]: (_, { payload }) => payload.user,
    [logoutSuccess]: () => initialUserState,
    [getCurrentUserSuccess]: (_, { payload }) => payload,
});
const token = createReducer(null, {
    [registerSuccess]: (_, { payload }) => payload.token,
    [loginSuccess]: (_, { payload }) => payload.token,
    [logoutSuccess]: () => null,
});

const serError = (_, { payload }) => payload;

const error = createReducer(null, {
    [registerError]: serError,
    [loginError]: serError,
    [logoutError]: serError,
    [getCurrentUserError]: serError,
});

export default combineReducers({ user, token, error });