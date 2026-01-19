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

console.log('[slug] BEFORE useAsyncData - checking nuxtApp.payload:')
console.log('[slug]   nuxtApp.payload exists:', !!nuxtApp.payload)
console.log('[slug]   nuxtApp.payload.data:', nuxtApp.payload?.data)
console.log('[slug]   nuxtApp.payload.data keys:', nuxtApp.payload?.data ? Object.keys(nuxtApp.payload.data) : 'N/A')
console.log('[slug]   nuxtApp.payload.data[asyncDataKey]:', nuxtApp.payload?.data?.[asyncDataKey])
console.log('[slug]   nuxtApp.payload.prerenderedAt:', nuxtApp.payload?.prerenderedAt)
console.log('[slug]   nuxtApp.isHydrating:', nuxtApp.isHydrating)

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
  const nuxtData = (window as unknown as { __NUXT__?: Record<string, unknown> }).__NUXT__
  console.log('[slug] CLIENT: __NUXT__ exists:', !!nuxtData)
  console.log('[slug] CLIENT: __NUXT__ top-level keys:', nuxtData ? Object.keys(nuxtData) : 'N/A')
  console.log('[slug] CLIENT: __NUXT__.state:', nuxtData?.state)
  console.log('[slug] CLIENT: __NUXT__.data:', nuxtData?.data)
  console.log('[slug] CLIENT: __NUXT__.payload:', nuxtData?.payload)
  if (nuxtData?.state && typeof nuxtData.state === 'object') {
    const state = nuxtData.state as Record<string, unknown>
    console.log('[slug] CLIENT: __NUXT__.state keys:', Object.keys(state))
    console.log('[slug] CLIENT: Looking for asyncDataKey in state:', state[asyncDataKey])
    const dataKey = `$s${asyncDataKey}`
    console.log('[slug] CLIENT: Looking for $s prefixed key:', state[dataKey])
  }
  const useNuxtApp = window.useNuxtApp as (() => { payload?: { data?: Record<string, unknown> } }) | undefined
  if (useNuxtApp) {
    try {
      const app = useNuxtApp()
      console.log('[slug] CLIENT: nuxtApp.payload.data:', app?.payload?.data)
      console.log('[slug] CLIENT: nuxtApp.payload.data keys:', app?.payload?.data ? Object.keys(app.payload.data) : 'N/A')
    } catch (e) {
      console.log('[slug] CLIENT: Could not get nuxtApp:', e)
    }
  }
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
