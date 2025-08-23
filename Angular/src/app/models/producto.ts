import { Categoria } from "./categoria";

export class Producto{
    public id?: number;
    nombre?: string;
    imagen?: string;
    descripcion?: string;
    precio?: number;
    cantidad?: number;
    fecha_creacion?: string;
    categoria?: number;

    constructor(nombre:string,descripcion:string,precio:number,fecha_creacion:string,imagen:string, cantidad:number, categoria:number){

        this.nombre=nombre;
        this.imagen=imagen;
        this.descripcion=descripcion;
        this.precio=precio;
        this.fecha_creacion=fecha_creacion;
        this.cantidad = cantidad;
        this.categoria = categoria;
        
    }
}