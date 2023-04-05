interface Producto {
  id:number,
  nombreProducto:string,
  categoria:string,
  descripcion:string,
  precio:number,
  disponible:boolean

}

interface Respuesta {
    data:string,
    status:number,
    headers:string,
}

interface Usuario {
  id:number,
  nombre:string,
  telefono:string
  email:string,
  claveUno:string
}

interface Pedido {
  producto:number,
  nombreProducto:string,
  precio:number,
  cantidad:number,
  descripcion:string
}

interface Modal {
  activarAviso:boolean,
  mensaje:string,
  color?:string
}

interface NuevaClave {
  email:string,
  passwordUno:string,
  passwordDos:string
}

export type {Producto,Respuesta,Usuario,Pedido,Aviso,NuevaClave};
