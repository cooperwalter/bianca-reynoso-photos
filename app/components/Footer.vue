<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <Container>
    <div class="dark:text-zinc-500 pb-16 mt-16">
      <div class="text-center">
        <p class="text-sm">&copy; {{ new Date().getFullYear() }} <NuxtLink :to="localePath('/')" class="text-zinc-500 hover:text-zinc-400">Bianca Reynoso</NuxtLink>, {{ t('footer.allRightsReserved') }}</p>
      </div>
    </div>
  </Container>
</template>
