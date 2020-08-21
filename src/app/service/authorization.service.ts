import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public token: string;

  constructor() {
  }

  setToken(authToken) {
    sessionStorage.setItem('Authorization', authToken);
  }

  getToken() {
    return sessionStorage.getItem('Authorization');
  }

  isAuthenticated(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    return true;
  }

  removeToken() {
    sessionStorage.removeItem('Authorization');
  }
}
