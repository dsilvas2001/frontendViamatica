export class Usermanage {
  _id?: number;
  nombre: string;
  apellido: string;
  identificacion: string;
  password: string;
  usuario: string;
  email: string;
  fechaCreacion?: Date;

  constructor(
    nombre: string,
    apellido: string,
    identificacion: string,
    password: string,
    usuario: string,
    email: string,
    fechaCreacion?: Date
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.identificacion = identificacion;
    this.password = password;
    this.usuario = usuario;
    this.email = email;
    this.fechaCreacion = fechaCreacion;
  }
}
