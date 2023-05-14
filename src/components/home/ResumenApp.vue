<template>
  <v-container class="my-16 py-16 font-poppins">
    <v-row class="my-16 py-16">
      <v-col>
        <h3>En nuestra app-web podras:</h3>
        <v-expansion-panels color="#f88905" >

          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Ver nuestra seccion de el menu del dia"
          text="Podras visualizar todo nuestro menu disponible del dia, en el menu se
          muestran todos los detalles de cada plato, como el precio del plato y
          los detalles especificos de como estan elaborados nuestros platos de comida
          "
          ></v-expansion-panel>
          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Registrarse en nuestra app-web"
          text="De manera facil y rapida podra registrarse en nuestra app-web ingresando, su nombre, correo electronico y
          su telefono podra habilitar la funcionalidad especial de elegir cada plato, seleccionar los contornos que mas guste
          y agregarlo a su lista de pedidos seleccionados que podra posteriormente visualizar y enviar el pedido.
          "
          ></v-expansion-panel>
          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Seleccionar plato y contornos"
          text="Una vez registrado y autenticado en nuestra app observara un boton en cada plato con la palabra 'Pedir'.
          Al darle click, se desplegara una ventana donde podra visualizar todos los contornos disponibles y que posteriormente
          podra elegir 3 contornos de todos los disponibles para que compongan su plato de comida. Al tener su plato y sus contornos
          listos le podra dar al boton 'Agregar a la lista' para que su plato sea agregado a la lista de pedidos.
          "
          ></v-expansion-panel>
          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Ver lista de platos seleccionados"
          text="En la barra navegadora de la app, podra observar una pestaña que dice 'Lista de pedidos(0)' que indica la cantidad
          de productos que ha agregado. Al darle click, podra visualizar todos los platos con los respectivos contornos que usted
          ha seleccionado. Ademas visualizara las cantidades, precio de cada plato, sus montos por cada plato y el monto final
          del pedido. Con el monto final observara un boton llamado 'Enviar pedido'.
          "
          ></v-expansion-panel>
          <v-expansion-panel
          bg-color="#fcecd2"
          variant="Popout"
          title="Enviar lista de platos seleccionados"
          text="De una manera detallada, el boton 'Enviar pedido' enviara en unos pocos minutos un mensaje de texto por whatsApp al
          al encargado de recibir los pedidos del restaurant local con los detalles del pedido realizado. En breve el encargado se
          comunicara con usted para confirmar detalles del pedido y suministrarle datos para la cancelacion del pedido.
          "
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
