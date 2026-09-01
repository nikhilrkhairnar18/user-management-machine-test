import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersApiService } from '../data/users-api.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(UsersApiService);

  load$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    switchMap(() => this.api.getUsers().pipe(
      map((users) => UsersActions.loadUsersSuccess({ users })),
      catchError(() => of(UsersActions.loadUsersFailure({ error: 'Could not load users. Is json-server running?' }))),
    )),
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.addUser),
    switchMap(({ user }) => this.api.addUser(user).pipe(
      map((created) => UsersActions.addUserSuccess({ user: created })),
      catchError(() => of(UsersActions.addUserFailure({ error: 'Could not add this user.' }))),
    )),
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.updateUser),
    switchMap(({ user }) => this.api.updateUser(user).pipe(
      map((updated) => UsersActions.updateUserSuccess({ user: updated })),
      catchError(() => of(UsersActions.updateUserFailure({ error: 'Could not update this user.' }))),
    )),
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.deleteUser),
    switchMap(({ id }) => this.api.deleteUser(id).pipe(
      map(() => UsersActions.deleteUserSuccess({ id })),
      catchError(() => of(UsersActions.deleteUserFailure({ error: 'Could not delete this user.' }))),
    )),
  ));
}
