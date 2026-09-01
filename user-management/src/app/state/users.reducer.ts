import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UsersActions from './users.actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  saving: boolean;
  error: string | null;
}

export const initialUsersState: UsersState = { users: [], loading: false, saving: false, error: null };

export const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(UsersActions.addUser, UsersActions.updateUser, UsersActions.deleteUser, (state) => ({ ...state, saving: true, error: null })),
  on(UsersActions.addUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user], saving: false })),
  on(UsersActions.updateUserSuccess, (state, { user }) => ({ ...state, users: state.users.map((item) => item.id === user.id ? user : item), saving: false })),
  on(UsersActions.deleteUserSuccess, (state, { id }) => ({ ...state, users: state.users.filter((user) => user.id !== id), saving: false })),
  on(UsersActions.addUserFailure, UsersActions.updateUserFailure, UsersActions.deleteUserFailure, (state, { error }) => ({ ...state, saving: false, error })),
);
