<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const currentPath = route.path

function getLocaleFromPath(path: string): 'en' | 'es' {
  return path.startsWith('/es') ? 'es' : 'en'
}

function getCollectionName(locale: 'en' | 'es'): 'content_en' | 'content_es' {
  return locale === 'es' ? 'content_es' : 'content_en'
}

function getContentPath(path: string, locale: 'en' | 'es'): string {
  let normalizedPath = path
  if (normalizedPath.startsWith('/es/')) {
    normalizedPath = normalizedPath.replace('/es/', '/')
  } else if (normalizedPath === '/es') {
    normalizedPath = '/'
  }
  return `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`
}

const urlLocale = getLocaleFromPath(currentPath)
const collectionName = getCollectionName(urlLocale)
const contentPath = getContentPath(currentPath, urlLocale)
const safePathKey = currentPath.replace(/\//g, '_') || '_root'
const asyncDataKey = `page-${urlLocale}-${safePathKey}`

const { data: page, refresh } = await useAsyncData(
  asyncDataKey,
  () => queryCollection(collectionName).path(contentPath).first(),
  { deep: false }
)

if (import.meta.client && !page.value) {
  await refresh()
}

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
