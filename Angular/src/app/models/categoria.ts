export class Categoria {
  public id?: number;
  public nombre: string;
  public tipo: string;

  constructor(nombre: string, tipo: string) {
    this.nombre = nombre;
    this.tipo = tipo;
  }
}
