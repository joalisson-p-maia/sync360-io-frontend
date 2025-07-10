import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListAllUsersType } from '../types/listAllUsersType';
import { GetUserByIdType } from '../types/getUserByIdType';
import { MessageStatusType } from '../types/messageStatusType';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly http: HttpClient
  ) { }

  apiUrl: string = "http://localhost:8000/api/user/";

  listAllUsers(): Observable<ListAllUsersType>{
    return this.http.get<ListAllUsersType>(this.apiUrl+'list_all_users');
  }

  getUserById(userId: string | null): Observable<GetUserByIdType>{
    return this.http.get<GetUserByIdType>(this.apiUrl+'get_user_by_id/' + userId);
  }

  createUser(data: any): Observable<MessageStatusType>{
    return this.http.post<MessageStatusType>(this.apiUrl+'create_user', data);
  }

  updateUser(userId: string | null,data: any): Observable<MessageStatusType>{
    return this.http.post<MessageStatusType>(this.apiUrl + 'update_user_by_id/' + userId, data);
  }

  deleteUser(userId: string | null): Observable<MessageStatusType>{
    return this.http.delete<MessageStatusType>(this.apiUrl + 'delete_user_by_id/' + userId);
  }
}
