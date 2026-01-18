<script setup lang="ts">
const props = defineProps({
  path: {
    type: String,
    default: "galleries",
  },
});

const normalizedPath = computed(() => props.path.startsWith('/') ? props.path : `/${props.path}`)

const { data: _galleries } = await useAsyncData(
  "galleries",
  async () =>
    await queryCollection('content')
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
        No galleries found.
      </p>
    </div>
</template>
