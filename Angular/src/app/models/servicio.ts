import { Sucursal } from "./sucursal";

export class Servicio {
    public id?: number;
    nombre?: string;
    imagen?: string | File; // permitir string o File
    descripcion?: string;
    precio: number;
    fecha_creacion?: string;
    sucursal?: Sucursal;   
    
    

    constructor(nombre:string,descripcion:string,precio:number,fecha_creacion:string,imagen:File){

        this.nombre=nombre;
        this.imagen=imagen;
        this.descripcion=descripcion;
        this.precio=precio;
        this.fecha_creacion=fecha_creacion;
        
    }
    
}