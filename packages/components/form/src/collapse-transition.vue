<template>
  <transition-group
    v-if="collapseTransition"
    name="plus-collapse-transition"
    :css="false"
    v-on="on"
  >
    <slot />
  </transition-group>
  <template v-else>
    <slot />
  </template>
</template>

<script lang="ts" setup>
import type { RendererElement } from 'vue'

type Props = {
  /**
   * @desc 动画时长
   * @version v0.1.15
   */
  collapseDuration?: number
  /**
   * @desc 是否开启折叠动画
   * @version v0.1.15
   */
  collapseTransition?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapseDuration: 300,
  collapseTransition: true
})

defineOptions({
  name: 'PlusCollapseTransition'
})

const on = {
  beforeEnter(el: RendererElement) {
    el.style.opacity = 0
  },
  enter(el: RendererElement, done: () => void) {
    requestAnimationFrame(() => {
      el.style.transition = `opacity ${props.collapseDuration}ms linear`
      el.style.opacity = 1
      done()
    })
  },

  leave(el: RendererElement, done: () => void) {
    el.style.opacity = 0
    setTimeout(() => {
      done()
    }, (props.collapseDuration / 3) * 2)
  }
}
</script>
