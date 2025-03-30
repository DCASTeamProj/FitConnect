import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; //need to update with correct api local host

  constructor(private http: HttpClient) { }

  // getUsers(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
