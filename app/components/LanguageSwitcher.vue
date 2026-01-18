<script setup lang="ts">
import { GlobeAltIcon } from "@heroicons/vue/20/solid";

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => {
  const found = locales.value.find((l) => typeof l === 'object' && l.code !== locale.value)
  return typeof found === 'object' ? found : null
})
</script>

<template>
  <NuxtLink
    v-if="otherLocale"
    :to="switchLocalePath(otherLocale.code)"
    :aria-label="t('ui.language')"
    class="border rounded-full px-2 py-2 text-zinc-500 border-zinc-500 hover:bg-white hover:text-zinc-900 hover:border-zinc-900 active:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-700 focus-visible:ring-opacity-75 flex items-center gap-1"
  >
    <GlobeAltIcon class="w-4 h-4" />
    <span class="text-xs uppercase font-medium">{{ locale }}</span>
  </NuxtLink>
</template>
