<template>
  <PlusCheckCard
    v-model="checked"
    title="名称"
    description="description"
    avatar="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    class="mgb-10"
  />
  <PlusCheckCard
    v-model="checked"
    size="large"
    title="名称"
    description="description"
    avatar="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    class="mgb-10"
  />
  <PlusCheckCard
    v-model="checked"
    size="small"
    title="名称"
    description="description"
    avatar="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<style lang="scss" scoped>
.mgb-10 {
  margin-bottom: 10px;
}
</style>
