import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from 'src/app/shared/types/category.model';
import { environment } from './../../../environments/environment';
import { State } from 'src/app/shared/types/state.models';
import { Product } from 'src/app/shared/types/product.model';
import { Options } from 'src/app/shared/types/options.model';
import { Router, UrlSerializer } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient, private router: Router, 
      private serializer: UrlSerializer, private authService: AuthService) {

   }

  getCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseURL}/categories`).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  getStates (): Observable<State[]> {
    return this.http.get<State[]>(`${environment.baseURL}/states`).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  getAds (options: Options): Observable<Product[]> {
    const tree = this.router.createUrlTree([], { queryParams: options }); // Criando uma query String a partir do objeto passado, como a biblioteca qs do React.
    return this.http.get<Product[]>(`${environment.baseURL}/ad/list${this.serializer.serialize(tree)}`).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    ); // O this.serialize é a forma como mostramos um objeto que foi transfromado em query string, estou fazendo exatamente o que a biblioteca qs do React faz.
  }

  getAd (id: string, other: boolean): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}/ad/${id}`).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  search (title: string): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}/search?title=${title}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  addAd (product: any): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/ad/add`, product, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getToken()}`)
    }).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  deleteAd (id: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseURL}/ad/${id}`, {
      headers: new HttpHeaders().append('Authorization', `Bearer ${this.authService.getToken()}`)
    }).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler (e: HttpErrorResponse): Observable<any> { // ErrorResponse é o tipo de erro que gera.
    //console.log(e.message); Mostra o nome do erro.
    console.log('ocorreu um erro');
    return EMPTY; // Nao seria necessario retornar esse EMPTY, mas se vc nao coloca isso, diz que nao pode retornar vazio
  }
}