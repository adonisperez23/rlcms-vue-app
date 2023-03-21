<template>
  <div class="text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
    >
      Pedir
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-title>{{menuOpcion}} {{precio}}$</v-card-title>
        <v-card-subtitle>Contornos disponibles a elegir: <strong>{{contornosDisponibles}}</strong></v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-select
            label="Indique la cantidad a pedir"
            :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
            v-model="cantidad"
            density="compact"
            class="w-25"
            ></v-select>
            <v-row>
              <v-col v-for="(contorno, index) in contornos" :key="index" cols="4">
                <v-switch
                v-model="contornosSeleccionados"
                :label="contorno"
                color="success"
                :value="contorno"
                hide-details
                :disabled="desactivar"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <div class="text-h5">
                {{cantidad}} {{menuOpcion}} con : {{concatenarContornosSeleccionados}}
              </div>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary"  @click="dialog = false">Atras</v-btn>
          <v-btn color="primary"  @click="resetearSeleccion">Resetear seleccion</v-btn>
          <v-btn color="primary"  @click="resetearSeleccion">Guardar pedido</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, inject} from "vue"

const props = defineProps<{
  menuOpcion: string,
  precio:string,
  // contornos:string[]
}>()

const contornosDisponibles = computed(()=>{
  switch (contornosSeleccionados.value.length) {
    case 0: return 3
      break;
    case 1: return 2
      break;
    case 2: return 1
     break;
    case 3: return 0
    break;
  }
})

const desactivar = computed(()=>{
  if(contornosDisponibles.value === 0) {
    return true
  } else {
    return false
  }
})
const cantidad = ref<number>(1)

const contornosSeleccionados = ref<string[]>([])

const listaProductos = inject('listaProductos')

const listaContornos = listaProductos.filter(producto => producto.categoria === 'Contorno')

const contornos = listaContornos.map(contorno => contorno.nombreProducto)

const dialog = ref<boolean>(false) // variable que controla el display del componente Pedido.vue

const resetearSeleccion = ():void =>{
  contornosSeleccionados.value = []
}

const concatenarContornosSeleccionados = computed(()=>{
  let unionContornos:string = ''
  contornosSeleccionados.value.forEach(contorno => {
    unionContornos += (contorno + ' ')
  })
  return unionContornos
})

</script>

<style scoped>
</style>
