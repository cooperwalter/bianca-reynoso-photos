<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const nuxtApp = useNuxtApp()

const requestUrl = useRequestURL()
const currentPath = requestUrl.pathname

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
const safePathKey = currentPath.replace(/\//g, '_')
const asyncDataKey = `page-${urlLocale}-${safePathKey}`

const isServer = import.meta.server
const isClient = import.meta.client

console.log('[slug] === DIAGNOSTICS ===')
console.log('[slug] Environment:', isServer ? 'SERVER' : 'CLIENT')
console.log('[slug] route.path:', route.path)
console.log('[slug] currentPath:', currentPath)
console.log('[slug] safePathKey:', safePathKey)
console.log('[slug] asyncDataKey:', asyncDataKey)
console.log('[slug] collectionName:', collectionName)
console.log('[slug] contentPath:', contentPath)

console.log('[slug] BEFORE useAsyncData - checking nuxtApp.payload:')
console.log('[slug]   payload.data keys:', nuxtApp.payload?.data ? Object.keys(nuxtApp.payload.data) : 'N/A')
console.log('[slug]   payload.data[asyncDataKey]:', nuxtApp.payload?.data?.[asyncDataKey])
console.log('[slug]   isHydrating:', nuxtApp.isHydrating)

const { data: page, status, error, pending, refresh } = await useAsyncData(
  asyncDataKey,
  () => {
    console.log('[slug] Fetcher called for:', asyncDataKey)
    return queryCollection(collectionName).path(contentPath).first()
  },
  {
    getCachedData(key, nuxtApp) {
      const cached = nuxtApp.payload.data[key]
      console.log('[slug] getCachedData called, key:', key, 'cached:', cached)
      return cached
    }
  }
)

console.log('[slug] After useAsyncData:')
console.log('[slug]   status:', status.value)
console.log('[slug]   pending:', pending.value)
console.log('[slug]   error:', error.value)
console.log('[slug]   page exists:', !!page.value)
console.log('[slug]   page.title:', page.value?.title)

if (isClient && !page.value && nuxtApp.isHydrating) {
  console.log('[slug] CLIENT: Page is null during hydration, attempting refresh...')
  await refresh()
  console.log('[slug] CLIENT: After refresh, page exists:', !!page.value)
}

if (!page.value) {
  console.log('[slug] !!! PAGE NOT FOUND !!!')
  throw createError({ statusCode: 404, message: t('errors.pageNotFound') })
}

console.log('[slug] === Page loaded successfully ===')

const layout = computed(() => (page.value?.layout || 'default') as 'default' | 'story')
</script>

<template>
  <NuxtLayout :name="layout">
    <ContentRenderer v-if="page" :value="page" />
  </NuxtLayout>
</template>
