export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',

  LOGOUT = '[Auth] Logout',

  REGISTRATION = '[Auth] Registration',
  REGISTRATION_SUCESS = '[Auth] Registration success',
  REGISTRATION_FAILURE = '[Auth] Registration failure',

  GET_USER = '[Auth] GetUser',
  GET_USER_SUCCESS = '[Auth] Get user success',
  GET_USER_FAILURE = '[Auth] Get user failure',

  CHANGE_USER = '[Auth] Change user',
  CHANGE_USER_SUCCESS = '[Auth] Change user success',
  CHANGE_USER_FAILURE = '[Auth] Change user failure',

  CHANGE_USER_IMAGE = '[Auth] Change user image',
  CHANGE_USER_IMAGE_SUCCESS = '[Auth] Change user image success',
  CHANGE_USER_IMAGE_FAILURE = '[Auth] Change user image failure',

  CHANGE_USER_PASSWORD = '[Auth] Change user password',
  CHANGE_USER_PASSWORD_SUCCESS = '[Auth] Change user password success',
  CHANGE_USER_PASSWORD_FAILURE = '[Auth] Change user password failure',

  GET_AUTH_STATUS = '[Auth] Get auth status',
  SET_AUTH_STATUS = '[Auth] Set auth status',
  AUTH_CLEAR_ERROR = '[Auth] Clear error message',
  AUTH_CLEAR_MESSAGE = '[Auth] Clear auth message',
}
