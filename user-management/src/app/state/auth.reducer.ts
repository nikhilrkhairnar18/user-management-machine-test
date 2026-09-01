import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  username: string | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  username: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { username }) => ({
    ...state,
    username,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logout, () => initialAuthState),
);
