<template>
  <el-header class="plus-header" :class="{ 'is-fixed': fixed }">
    <div class="plus-header__left">
      <component
        :is="renderHeaderLeft"
        v-if="renderHeaderLeft && isFunction(renderHeaderLeft)"
        :logo="logo"
        :title="title"
      />

      <slot v-else-if="$slots['header-left']" name="header-left" :logo="logo" :title="title" />

      <template v-else>
        <img v-if="logo" :src="logo" alt="" class="plus-header__logo" />
        <h2 v-if="title" class="plus-header__title">{{ title }}</h2>
      </template>
    </div>

    <div class="plus-header__placeholder" />

    <div class="plus-header__right">
      <component
        :is="renderHeaderRight"
        v-if="renderHeaderRight && isFunction(renderHeaderRight)"
        :user-info="userInfo"
        :title="title"
      />

      <slot
        v-else-if="$slots['header-right']"
        name="header-right"
        :user-info="userInfo"
        :title="title"
      />

      <el-dropdown v-if="hasUserInfo" placement="bottom-end" trigger="click">
        <span class="plus-header__dropdown-area">
          <!-- avatar -->
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="" class="plus-header__avatar" />
          <el-icon v-else :size="20" class="plus-header__avatar"><User /></el-icon>

          <!-- username -->
          <p class="plus-header__username">{{ userInfo.username || 'admin' }}</p>

          <el-icon class="el-icon-caret-bottom el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu class="header-dropdown">
            <el-dropdown-item @click="handleClickItem(logoutItem)">
              {{ logoutText || t('plus.header.logout') }}
            </el-dropdown-item>
            <el-dropdown-item
              v-for="item in dropdownList"
              :key="item.value"
              @click="handleClickItem(item)"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>

  <div v-if="fixed" class="plus-header-placeholder" />
</template>

<script lang="ts" setup>
import { ArrowDown, User } from '@element-plus/icons-vue'
import { ElIcon, ElHeader, ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { useLocale } from '@plus-pro-components/hooks'
import { isFunction } from '@plus-pro-components/components/utils'
import type { PlusHeaderSelfProps as PlusHeaderProps, PlusHeaderEmits } from './type'

defineOptions({
  name: 'PlusHeader'
})

const props = withDefaults(defineProps<PlusHeaderProps>(), {
  logo: 'https://plus-pro-components.com/logo.png',
  title: 'PlusProComponents',
  trigger: 'click',
  userInfo: () => ({}),
  dropdownList: () => [],
  logoutText: '',
  hasUserInfo: true,
  fixed: false
})

const emit = defineEmits<PlusHeaderEmits>()

const { t } = useLocale()

const logoutItem = {
  label: props.logoutText || t('plus.header.logout'),
  value: 'logout'
}

const handleClickItem = (item: { label: string; value: string }) => {
  emit('clickDropdownItem', item)
}
</script>
