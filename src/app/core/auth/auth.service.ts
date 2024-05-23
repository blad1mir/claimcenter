import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Lógica de autenticación: Verificar las credenciales
    if (username === 'usuario' && password === 'password') {
      this.isLoggedIn = true;
      return true; // Autenticación exitosa
    } else {
      this.isLoggedIn = false;
      return false; // Autenticación fallida
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
