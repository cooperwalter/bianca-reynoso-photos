<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()

const collectionName = computed(() =>
  locale.value === 'es' ? 'content_es' : 'content_en'
)

const contentPath = computed(() => {
  let path = route.path
  if (path.startsWith('/es/')) {
    path = path.replace('/es/', '/')
  } else if (path === '/es') {
    path = '/'
  }
  const localePath = `/${locale.value}${path === '/' ? '' : path}`
  return localePath || `/${locale.value}`
})

const { data: page } = await useAsyncData(
  `page-${locale.value}-${route.path}`,
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
