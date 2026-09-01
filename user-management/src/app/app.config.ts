import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { appRoutes } from './app.routes';
import { AuthEffects } from './state/auth.effects';
import { authReducer } from './state/auth.reducer';
import { UsersEffects } from './state/users.effects';
import { usersReducer } from './state/users.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ auth: authReducer, users: usersReducer }),
    provideEffects([AuthEffects, UsersEffects]),
  ],
};