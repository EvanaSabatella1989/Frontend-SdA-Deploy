import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Categoria } from '../models/categoria'


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  //  url:string="http://localhost:3000/";
url:string="http://localhost:8000/api/"

constructor(private http:HttpClient) { }

ngOnInit(){}

//categorias
obtenerCategorias():Observable<any>{
   return this.http.get(this.url+"categoria/");
   
 }

//obtener categoria
 public detail(id:number): Observable<Categoria>{
  //  return this.http.get<Categoria>(this.url+'categoria/'+ `detail/${id} `);
  return this.http.get<Categoria>(this.url + 'categoria/'+ id + '/');
 };

//alta de una categoría
public create(categoria:any):Observable<any>{
  
  return this.http.post(this.url+'categoria/',categoria);
} 

//actualizar categoría
public update(id:any,categoria: Categoria): Observable<any>{
//  return this.http.put(this.url+'categoria/'+ `update/${id}`+ '/',categoria);
  return this.http.put(this.url+'categoria/'+id+ '/',categoria);  
}

//eliminar categoría
public delete(id:number):Observable<any>{
//  return this.http.delete<Categoria>(`${this.url+'categoria'}/${id}`);
  return this.http.delete<Categoria>(this.url+'categoria/'+ id + '/');
}
}
