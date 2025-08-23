import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string="http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token'); // Recuperar el token JWT
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Agregar el token al header
        'Content-Type': 'application/json'
      });
    }

  public traerProductos():Observable<any>{
    return this.http.get(this.url +"producto/");

  };
  
  public detail(Id:number): Observable<any>{
    return this.http.get<any>(this.url + 'producto/'+ Id + '/');
  };

  public detailCat(Id:number): Observable<any>{

    return this.http.get<any>(this.url + 'producto?idCategoria='+ Id);
  };

  public traerCategorias():Observable<any>{
    return this.http.get(this.url +"categoria/");

  };
  public categoria(Id:number): Observable<any>{
    return this.http.get<any>(this.url + 'categoria/'+ Id);
  };

  //alta de una producto
public create(data:any):Observable<any>{
  //return this.http.post(this.url,data);
  console.log('servicio ' + data.nombre)
  //return this.http.post(this.url +'producto/',data );
  return this.http.post(`${this.url}producto/`, data);

 } 
 
 //actualizar producto
 public update(id:any,data:any): Observable<any>{
  return this.http.put(`${this.url}producto/${id}/`,data);
 }
 
 //eliminar producto
 public delete(id:any):Observable<any>{
  return this.http.delete(`${this.url}producto/${id}/`);
 }

}
