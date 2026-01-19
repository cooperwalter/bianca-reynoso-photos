<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

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
const asyncDataKey = `page-${urlLocale}-${currentPath}`

const isServer = import.meta.server
const isClient = import.meta.client

console.log('[slug] === DIAGNOSTICS ===')
console.log('[slug] Environment:', isServer ? 'SERVER' : 'CLIENT')
console.log('[slug] route.path:', route.path)
console.log('[slug] requestUrl.pathname:', currentPath)
console.log('[slug] urlLocale:', urlLocale)
console.log('[slug] collectionName:', collectionName)
console.log('[slug] contentPath:', contentPath)
console.log('[slug] asyncDataKey:', asyncDataKey)

const { data: page, status, error, pending } = await useAsyncData(
  asyncDataKey,
  () => {
    console.log('[slug] useAsyncData fetcher called, querying:', collectionName, 'path:', contentPath)
    return queryCollection(collectionName).path(contentPath).first()
  }
)

console.log('[slug] After useAsyncData:')
console.log('[slug]   status:', status.value)
console.log('[slug]   pending:', pending.value)
console.log('[slug]   error:', error.value)
console.log('[slug]   page.value exists:', !!page.value)
console.log('[slug]   page.value?.id:', page.value?.id)
console.log('[slug]   page.value?.title:', page.value?.title)

if (isClient) {
  console.log('[slug] CLIENT: Checking window.__NUXT__')
  const nuxtData = (window as unknown as { __NUXT__?: { data?: Record<string, unknown> } }).__NUXT__
  console.log('[slug] CLIENT: __NUXT__.data keys:', nuxtData?.data ? Object.keys(nuxtData.data) : 'N/A')
  console.log('[slug] CLIENT: __NUXT__.data[asyncDataKey]:', nuxtData?.data?.[asyncDataKey])
}

if (!page.value) {
  console.log('[slug] !!! PAGE NOT FOUND - About to throw 404 !!!')
  console.log('[slug] This should NOT happen if SSG worked correctly')
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
