<script setup lang="ts">
const props = defineProps({
  path: {
    type: String,
    default: "galleries",
  },
});

const { locale, t } = useI18n()

const collectionName = computed(() =>
  locale.value === 'es' ? 'content_es' : 'content_en'
)

const normalizedPath = computed(() => {
  const basePath = props.path.startsWith('/') ? props.path : `/${props.path}`
  return `/${locale.value}${basePath}`
})

const { data: _galleries } = await useAsyncData(
  `galleries-${locale.value}`,
  async () =>
    await queryCollection(collectionName.value as 'content_en' | 'content_es')
      .where('path', 'LIKE', `${normalizedPath.value}/%`)
      .all()
);

const galleries = computed(() => _galleries.value || [])

</script>

<template>
  <div v-if="galleries?.length" class="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <GalleryListItem
        v-for="(gallery, index) in galleries"
        :key="index"
        :gallery="gallery"
      />
    </div>
    <div v-else>
      <p class="">
        {{ t('errors.noGalleries') }}
      </p>
    </div>
</template>
