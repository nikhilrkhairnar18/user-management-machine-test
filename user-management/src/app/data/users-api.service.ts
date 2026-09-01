import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserDraft } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'http://localhost:3000/users';

  getUsers() { return this.http.get<User[]>(this.endpoint); }
  addUser(user: UserDraft) { return this.http.post<User>(this.endpoint, user); }
  updateUser(user: User) { return this.http.put<User>(`${this.endpoint}/${user.id}`, user); }
  deleteUser(id: number) { return this.http.delete<void>(`${this.endpoint}/${id}`); }
}
