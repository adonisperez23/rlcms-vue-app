export const useValidarEmail = [(value) => {

        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value)) return true

          return 'Debe ingresar un correo electronico valido'

        }]

export const useValidarNombre = [ value => {
            if(value.length >= 3) return true

            return 'Su nombre debe contener mas de 2 caracteres'

          },

          value => {

            if (/^([a-zA-Z]+\s?){4}?$/.test(value) || value.length === 3) return true

            return 'Verifique que no tenga numeros, simbolos o que excesos de caracteres'

          },

          value =>{

          if (value.length <= 50) return true

          return 'Ha superado el limite de caracteres'

        }]

export const useValidarTelefono =[ value => {

            if(value.length === 7) return true

            return 'El numero de telefono no es valido'

        }]

export const useValidarClaveUno = [value => {

                  if (value.length >= 5) return true

                  return 'Su clave debe contener mas de 5 caracteres'

                }]
