<template >
  <div class="text-center">
    <v-dialog
      :model-value="dialog"
      width="auto"
    >
      <v-card>
        <v-card-text class="text-h5">
          {{mensaje}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="emit('activar-aviso')">Ok</v-btn>
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
  color?:string
}>()

const emit = defineEmits<{
  (e:'activar-aviso'):void
}>()


</script>

<style scoped>
</style>
