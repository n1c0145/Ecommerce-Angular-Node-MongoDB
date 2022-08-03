export class Producto {
  _id?: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string;
  imagen: string;

  constructor(
    nombre: string,
    precio: number,
    descripcion: string,
    categoria: string,
    imagen: string
  ) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}
