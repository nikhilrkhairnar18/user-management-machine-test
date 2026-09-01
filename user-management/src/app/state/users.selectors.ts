import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');
export const selectAllUsers = createSelector(selectUsersState, (state) => state.users);
export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);
export const selectUsersSaving = createSelector(selectUsersState, (state) => state.saving);
export const selectUsersError = createSelector(selectUsersState, (state) => state.error);
