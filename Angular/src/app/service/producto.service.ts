import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // url:string="https://backend-sda-deploy.onrender.com/api";
  url:string=environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('access_token'); // Recuperar el token JWT
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Agregar el token al header
        'Content-Type': 'application/json'
      });
    }

  public traerProductos():Observable<any>{
    return this.http.get(this.url +"/productos/");

  };
  
  public detail(Id:number): Observable<any>{
    return this.http.get<any>(this.url + '/producto/'+ Id + '/');
  };

  public detailCat(Id:number): Observable<any>{

    return this.http.get<any>(this.url + '/producto?idCategoria='+ Id);
  };

  // public traerCategorias():Observable<any>{
  //   return this.http.get(this.url +"categoria/");

  // };

  traerCategorias(tipo: string = '') {
  let url = this.url + '/categorias/';
  if(tipo){
    url += `?tipo=${tipo}`;
  }
  return this.http.get<any[]>(url); // <-- indicamos que devuelve un array
}
  public categoria(Id:number): Observable<any>{
    return this.http.get<any>(this.url + '/categoria/'+ Id);
  };


  // public create(data:any):Observable<any>{
  //   console.log('producto ' + data.nombre)
  //   return this.http.post(`${this.url}/productos/`, data,{ headers: this.getHeaders() });
  // } 

  public create(data: FormData): Observable<any> {
  return this.http.post(
    `${this.url}/productos/`,
    data,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      })
    }
  );
}


 
 //actualizar producto
 public update(id:any,data:any): Observable<any>{
  return this.http.put(`${this.url}/producto/${id}/`,data,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      })
    });
 }
 
 //eliminar producto
 public delete(id:any):Observable<any>{
  return this.http.delete(`${this.url}/producto/${id}/`,{ headers: this.getHeaders() });
 }

}

