<template>
  <PlusRadio v-model="state.value" :options="state.options" @change="change" />
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { OptionsRow, RecordType } from 'plus-pro-components'

type State = {
  options: OptionsRow<RecordType>[]
  value: number
}

const state = reactive<State>({
  options: [
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2 }
  ],
  value: 1
})

watch(
  () => state.value,
  val => {
    console.log(val)
  },
  { immediate: true }
)
const change = (val: string | number | boolean) => {
  console.log(val)
}
</script>
