import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {

   }

   me (): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}/user/me`, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getToken()}`)
    }).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
   }

   getUser (id: number): Observable<any> {
     return this.http.get<any>(`${environment.baseURL}/user/${id}`).pipe(
       map(obj => obj),
       catchError(e => this.errorHandler(e))
     );
   }

   updateUser (user: any): Observable<any> {
    return this.http.put<any>(`${environment.baseURL}/user/me`, user, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getToken()}`)
    }).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    ); // No update, nos passamos a url e o proprio produto
  }
  
  deleteUser (): Observable<any> {
    return this.http.delete<any>(`${environment.baseURL}/user/me`, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getToken()}`)
    }).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

   errorHandler (e: any): Observable<any> {
    console.log(e);
    console.log('ocorreu um erro');
    return EMPTY;
  }
}
