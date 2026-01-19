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

console.log('[slug] asyncDataKey:', asyncDataKey, 'collectionName:', collectionName, 'contentPath:', contentPath)

const { data: page, status, refresh } = await useAsyncData(
  asyncDataKey,
  () => queryCollection(collectionName).path(contentPath).first(),
  {
    deep: false
  }
)

console.log('[slug] After useAsyncData: status:', status.value, 'page exists:', !!page.value)

if (import.meta.client && !page.value) {
  console.log('[slug] CLIENT: No page data, refreshing...')
  await refresh()
  console.log('[slug] CLIENT: After refresh, page exists:', !!page.value)
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
