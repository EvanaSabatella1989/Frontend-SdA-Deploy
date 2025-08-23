export class Sucursal {
    id?: number;
    nombre?: string;
    direccion?: string;
    telefono?: number;
    latitud?: number;
    longitud?:number;
    mapaUrl?: any;

    constructor(nombre:string,direccion:string,telefono:number,latitud:number,longuitud:number){
        this.nombre=nombre;
        this.direccion=direccion;
        this.telefono=telefono;
        this.latitud=latitud;
        this.latitud=longuitud;
    }

}