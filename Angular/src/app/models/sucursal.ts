import { Servicio } from "./servicio";

export class Sucursal {
    id?: number;
    nombre?: string;
    direccion?: string;
    telefono?: number;
    latitud?: number;
    longitud?:number;
    mapaUrl?: any;
    ciudad?: string;
    provincia?: string;
    servicios?: Servicio[];


    constructor(nombre:string,direccion:string,telefono:number,latitud:number,longuitud:number,ciudad:string,provincia:string){
        this.nombre=nombre;
        this.direccion=direccion;
        this.telefono=telefono;
        this.latitud=latitud;
        this.latitud=longuitud;
        this.ciudad=ciudad;
        this.provincia=provincia;
    }

}