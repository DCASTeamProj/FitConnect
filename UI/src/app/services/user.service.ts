import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../Models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; //need to update with correct api local host

  constructor(private http: HttpClient) { }

  //WHEN CONNECTED TO API
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl);
  // }

  // createUser(user: any): Observable<any> {
  //   return this.http.post(this.apiUrl, user);
  // }


  //MOCK TESTING ONLY
  getUsers(): Observable<User[]> {
    // Mock user data
    const mockUsers: User[] = [
      { id: '1', firstName: 'John', lastName: 'Doe', username: 'JohnDoe21', profilePicture: 'assets/images/me.jpg' },
      { id: '2', firstName: 'Jane', lastName: 'Smith', username: 'JaneSmith88', profilePicture: 'assets/images/DPHeadshot.jpg' }
    ];
    return of(mockUsers);
  }

  createUser(user: any): Observable<any> {
    console.log('Mock user created:', user);
    return of(user); // Simulate successful creation
  }

}
