import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectUsername = createSelector(selectAuthState, (state) => state.username);
export const selectAuthError = createSelector(selectAuthState, (state) => state.error);
