<template>
  <div class="catalog fixed-right">
    <div class="index-top">索引目录</div>
    <div class="level-box">
      <SidebarChild
        v-for="item in sidebarItems"
        :key="item.link || item.text"
        :inner="true"
        :item="item"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { SidebarChild } from './SidebarChild'
import { useSidebarItems } from '../composables'

export default defineComponent({
  name: 'CataLog',
  components: {
    SidebarChild,
  },
  setup() {
    const sidebarItems = useSidebarItems()
    return {
      sidebarItems,
    }
  },
})
</script>
