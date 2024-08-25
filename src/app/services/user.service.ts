import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  getUsers(): Observable<any[]> {
    return this.users$;
  }

  updateUser(index: number, user: any) {
    const users = this.usersSubject.getValue();
    users[index] = user;
    this.usersSubject.next(users)
    return this.getUsers();
  }

}
