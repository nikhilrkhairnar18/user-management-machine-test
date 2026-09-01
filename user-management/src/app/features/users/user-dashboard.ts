import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { JobRole, User } from '../../models/user.model';
import * as AuthActions from '../../state/auth.actions';
import * as UsersActions from '../../state/users.actions';
import { selectUsername } from '../../state/auth.selectors';
import { selectAllUsers, selectUsersError, selectUsersLoading, selectUsersSaving } from '../../state/users.selectors';

@Component({
  selector: 'app-user-dashboard',
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboard implements OnInit {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);

  readonly users$ = this.store.select(selectAllUsers);
  readonly username$ = this.store.select(selectUsername);
  readonly loading$ = this.store.select(selectUsersLoading);
  readonly saving$ = this.store.select(selectUsersSaving);
  readonly error$ = this.store.select(selectUsersError);
  readonly roles: JobRole[] = ['tech', 'id', 'gd', 'qa'];
  editingId: number | null = null;

  readonly form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.maxLength(40)]],
    email: ['', [Validators.required, Validators.email]],
    jobRole: ['tech' as JobRole, Validators.required],
  });

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const user = { username: value.username.trim(), email: value.email.trim(), 'job-role': value.jobRole };
    if (this.editingId === null) {
      this.store.dispatch(UsersActions.addUser({ user }));
    } else {
      this.store.dispatch(UsersActions.updateUser({ user: { ...user, id: this.editingId } }));
    }
    this.resetForm();
  }

  edit(user: User): void {
    this.editingId = user.id;
    this.form.setValue({ username: user.username, email: user.email, jobRole: user['job-role'] });
  }

  remove(user: User): void {
    if (window.confirm(`Delete ${user.username}?`)) {
      this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
    }
  }

  resetForm(): void {
    this.editingId = null;
    this.form.reset({ username: '', email: '', jobRole: 'tech' });
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
