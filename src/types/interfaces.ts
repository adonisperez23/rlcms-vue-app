interface Producto {
  id?:number,
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
  color?:string,
  idInfo?:number
}

interface NuevaClave {
  email:string,
  passwordUno:string,
  passwordDos:string
}

interface Factura {
  idFactura: number,
  fechaHora: string,
  usuario: Usuario,
  pedido: Pedido[]
}

interface Foto {
  id?:number,
  nombreFoto:string,
  direccionUrl:string,
  producto:number
}

export type {Producto,Respuesta,Usuario,Pedido,Aviso,NuevaClave, Factura, Foto};
