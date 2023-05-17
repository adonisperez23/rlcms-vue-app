<template >
  <div class="text-center">
    <v-dialog
      :model-value="dialog"
      width="auto"
    >
      <v-card  class="mx-auto text-center">
        <v-card-text class="text-h5">
          {{mensaje}}
        </v-card-text>


        <v-card-item class="text-center">
          <slot name="imagen"></slot>
        </v-card-item>

        <v-card-text>
          <slot name="lista"></slot>
        </v-card-text>



        <v-card-actions v-if="unaAccion">
          <v-btn color="primary" block @click="emit('activar-aviso')">Ok</v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="dosAcciones">
          <v-btn color="primary"  @click="emit('accion-si')">Si</v-btn>
          <v-btn color="primary"  @click="emit('accion-no')">No</v-btn>
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
}>()

const emit = defineEmits<{
  (e:'activar-aviso'):void,
  (e:'accion-si'):void,
  (e:'accion-no'):void,

}>()


</script>

<style scoped>
</style>
