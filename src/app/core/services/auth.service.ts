import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { User } from 'src/app/shared/types/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

   }

  isLogged () {
    if (window.localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    } // Aqui vai se pegar do localStorage
  }

  getToken () {
   return  window.localStorage.getItem('token');
  }

  doLogin (token: string, remmemberPassword = false) {
    if (remmemberPassword) {
        window.localStorage.setItem('token', token); // Substituir com Cookies depois
    } else {
      window.localStorage.setItem('token', token); // Vou mudar aqui para Cookies
    } // Aqui a logica vai mudar 
  }

  doLogout () {
    window.localStorage.removeItem('token');
    window.location.href = '';
    return this.http.post<any>(`${environment.baseURL}/user/signout`, {}, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.getToken()}`)
    }).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  signIn (user: any): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/user/signin`,  user).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  signUp (user: User): Observable<any> {
    return this.http.post<User>(`${environment.baseURL}/user/signup`, user).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler (e: HttpErrorResponse): Observable<any> {
    //console.log(e.error);
    console.log('ocorreu um erro');
    return EMPTY; // Nao seria necessario retornar esse EMPTY, mas se vc nao coloca isso, diz que nao pode retornar vazio
  }
}
