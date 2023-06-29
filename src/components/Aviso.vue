<template >
  <div class="text-center">
    <v-dialog
      :model-value="dialog"
      width="auto"
    >
      <v-card color="#fcecd2" class="mx-auto text-center">
        <v-card-text >
          <v-sheet rounded color="yellow-darken-2">
            <h4>{{mensaje}}</h4>
          </v-sheet>
        </v-card-text>

        <v-card-item class="text-center">
          <slot name="icon"></slot>
        </v-card-item>

        <v-card-item class="text-center">
          <slot name="imagen"></slot>
        </v-card-item>

        <v-card-item class="text-center">
          <slot name="lista"></slot>
        </v-card-item>



        <v-card-actions v-if="unaAccion">
          <v-btn append-icon="mdi-hand-okay" color="green" block @click="emit('activar-aviso')">Ok</v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="dosAcciones">
          <v-btn append-icon="mdi-hand-okay" color="green"  @click="emit('accion-si')">Si</v-btn>
          <v-btn append-icon="mdi-cancel" color="red"  @click="emit('accion-no')">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const props = defineProps<{
  dialog:boolean,
  mensaje:string,
  unaAccion?:boolean,
  dosAcciones?:boolean,
  color?:string,
  mostrarIcon?:boolean,
}>()

const emit = defineEmits<{
  (e:'activar-aviso'):void,
  (e:'accion-si'):void,
  (e:'accion-no'):void,

}>()


</script>

<style scoped>
</style>
