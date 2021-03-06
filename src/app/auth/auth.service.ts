import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';
import { LoginResponse, SignupResponse } from '../models/interfaces-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login (email: string, password: string): Observable<LoginResponse> {
    const authBase64: string = 'Basic ' + btoa(email + ':' + password);
    const headers = new HttpHeaders({'Authorization': authBase64 });
    return this.http.get<LoginResponse>(
      `${environment.baseURL}/users/login`, 
      { headers },
    );
  }

  public signup (email: string, password: string): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(
      `${environment.baseURL}/users`,
      { email, password }
    );
  }

  public setSession (authToken: string, email: string):void {
    localStorage.setItem('id_token', authToken);
    localStorage.setItem('email', email);
  }
  
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  public getToken(): string {
    return localStorage.getItem('id_token');
  }

  public deleteToken() {
    localStorage.removeItem('id_token');
  }

}
