<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-default-content">
      <div class="content">
        <Content />
      </div>
      <CataLog />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'
import CataLog from './CataLog.vue'

export default defineComponent({
  name: 'Page',

  components: {
    PageMeta,
    PageNav,
    CataLog,
  },
})
</script>
