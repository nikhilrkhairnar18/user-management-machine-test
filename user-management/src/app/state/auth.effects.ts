import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, tap } from 'rxjs';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      map(({ username, password }) =>
        username.trim() && password
          ? AuthActions.loginSuccess({ username: username.trim() })
          : AuthActions.loginFailure({ error: 'Enter a username and password to continue.' }),
      ),
      catchError(() => of(AuthActions.loginFailure({ error: 'Unable to sign in.' }))),
    ),
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/users'])),
      ),
    { dispatch: false },
  );

  redirectAfterLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.router.navigate(['/login'])),
      ),
    { dispatch: false },
  );

}
