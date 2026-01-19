<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

const urlLocale = computed(() => {
  return route.path.startsWith('/es') ? 'es' : 'en'
})

const collectionName = computed(() =>
  urlLocale.value === 'es' ? 'content_es' : 'content_en'
)

const contentPath = computed(() => {
  let path = route.path
  if (path.startsWith('/es/')) {
    path = path.replace('/es/', '/')
  } else if (path === '/es') {
    path = '/'
  }
  return `/${urlLocale.value}${path === '/' ? '' : path}`
})

const { data: page } = await useAsyncData(
  `page-${urlLocale.value}-${route.path}`,
  () => queryCollection(collectionName.value as 'content_en' | 'content_es').path(contentPath.value).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, message: t('errors.pageNotFound') })
}

const layout = computed(() => (page.value?.layout || 'default') as 'default' | 'story')
</script>

<template>
  <NuxtLayout :name="layout">
    <ContentRenderer v-if="page" :value="page" />
  </NuxtLayout>
</template>
