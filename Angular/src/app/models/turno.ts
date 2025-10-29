import { Sucursal } from "./sucursal";

export class Turno{
    id?: number;
    sucursal?: Sucursal;   
    fecha?: string;      
    hora?: string;
    disponible?: boolean;
}