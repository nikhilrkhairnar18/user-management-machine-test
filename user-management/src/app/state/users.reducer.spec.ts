import { User } from '../models/user.model';
import * as UsersActions from './users.actions';
import { initialUsersState, usersReducer } from './users.reducer';

describe('usersReducer', () => {
  const firstUser: User = { id: 1, username: 'johndoe', email: 'john@example.com', 'job-role': 'tech' };

  it('stores users after loading succeeds', () => {
    const state = usersReducer(initialUsersState, UsersActions.loadUsers());
    const loaded = usersReducer(state, UsersActions.loadUsersSuccess({ users: [firstUser] }));

    expect(loaded.users).toEqual([firstUser]);
    expect(loaded.loading).toBe(false);
    expect(loaded.error).toBeNull();
  });

  it('updates and removes users without changing other records', () => {
    const secondUser: User = { ...firstUser, id: 2, username: 'janedoe' };
    const state = { ...initialUsersState, users: [firstUser, secondUser] };
    const updated = usersReducer(state, UsersActions.updateUserSuccess({ user: { ...firstUser, email: 'new@example.com' } }));
    const removed = usersReducer(updated, UsersActions.deleteUserSuccess({ id: 2 }));

    expect(removed.users).toEqual([{ ...firstUser, email: 'new@example.com' }]);
  });
});
