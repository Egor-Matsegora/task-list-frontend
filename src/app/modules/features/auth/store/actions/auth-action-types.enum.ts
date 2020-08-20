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

  GET_AUTH_STATUS = '[Auth] Get auth status',
  SET_AUTH_STATUS = '[Auth] Set auth status',
  AUTH_CLEAR_ERROR = '[Auth] Clear error message',
  AUTH_CLEAR_MESSAGE = '[Auth] Clear auth message',
}
