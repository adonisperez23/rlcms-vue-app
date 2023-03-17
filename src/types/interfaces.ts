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
  nombre:string,
  telefono:string
  email:string,
  claveUno:string
}

export {Producto,Respuesta,Usuario};
