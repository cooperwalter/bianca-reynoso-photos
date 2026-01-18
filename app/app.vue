<template>
  <div>
      <NuxtLoadingIndicator />
      <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
})

useHead({
  bodyAttrs: {
    class: "flex h-full flex-col bg-zinc-100 text-zinc-700 dark:text-zinc-300 dark:bg-body-dark",
  },
  htmlAttrs: {
    lang: locale,
    class: "font-body h-full antialiased",
  },
  link: computed(() => [...(head.value.link || [])]),
  meta: computed(() => [...(head.value.meta || [])]),
});
</script>