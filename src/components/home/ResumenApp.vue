<template>
  <v-container  class="mt-5 pt-5 mb-16 pb-16">
    <v-row class="mt-16 pt-16 mb-16 pb-16">
      <v-col>
        <h3 class="text-left">En nuestra APP podras hacer lo siguiente:</h3>
        <v-expansion-panels color="#f3d595" >

          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Ver nuestra seccion 'Menu'"
          text=" Usted podrá visualizar todo nuestro menu disponible del dia, en el menu se
          muestran todos los detalles de cada plato, como el precio del plato y
          los detalles especificos de como estan elaborados nuestros platos de comida.
          "
          ></v-expansion-panel>
          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Registrarse en nuestra APP-WEB"
          text="De manera facil y rapida podrá registrarse en nuestra APP-WEB ingresando; su nombre, correo electronico y
          su numero de telefono podrá habilitar la funcionalidad especial de elegir cada plato. Ademas podra seleccionar los contornos que mas guste
          y agregarlo a su lista de pedidos seleccionados.
          "
          ></v-expansion-panel>
          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Seleccionar plato y contornos"
          text="Una vez registrado y autenticado en nuestra app observará un boton en cada plato con la palabra 'Pedir'.
          Al darle click, se desplegará una ventana donde podrá visualizar todos los contornos disponibles y que posteriormente
          podra elegir 3 contornos de todos los que se encuentren disponibles para que complementen su plato de comida. Al tener su plato y sus contornos
          listos le podra dar al boton 'Agregar a la lista' para que su plato sea agregado a la lista de pedidos.
          "
          ></v-expansion-panel>
          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Ver lista de platos seleccionados"
          text="En la barra navegadora de la APP, podrá observar una pestaña que dice 'Lista de pedidos(0)' que indica la cantidad
          de productos que ha agregado. Al darle click, podra visualizar todos los platos con los respectivos contornos que usted
          ha seleccionado. Ademas visualizará las cantidades, precio de cada plato, sus montos por cada plato y el monto final
          del pedido. Con el monto final observará un boton llamado 'Enviar pedido'.
          "
          ></v-expansion-panel>
          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Enviar lista de platos seleccionados"
          text="De una manera detallada, el boton 'Enviar pedido' abrirá su aplicacion de whatsApp
          (Esta funcionalidad solo se podra habilitar abriendo la app por el navegador de su telefono celular) con el mensaje de texto
          prederterminado con los detalles del pedido que previamente ha armado en la app y se enviará  al encargado de recibir los pedidos
          del restaurant local. En breve el encargado se comunicara con usted para confirmar detalles del pedido
          y suministrarle datos para la cancelacion del pedido."
          ></v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

  </v-container>

</template>

<script setup lang="ts">

</script>

<style>
</style>
