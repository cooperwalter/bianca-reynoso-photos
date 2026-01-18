<script setup lang="ts">
const props = defineProps({
  path: {
    type: String,
    default: "stories",
  },
});

const normalizedPath = computed(() => props.path.startsWith('/') ? props.path : `/${props.path}`)

const { data: _stories } = await useAsyncData(
  "stories",
  async () =>
    await queryCollection('content')
      .where('path', 'LIKE', `${normalizedPath.value}/%`)
      .order('date', 'DESC')
      .all()
);

const stories = computed(() => _stories.value || []);
</script>

<template>
  <div
    v-if="stories?.length"
    class="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <StoryListItem v-for="story in stories" :key="story.path" :story="story" />
    
  </div>
  <div v-else>
    <p class="">No Stories found.</p>
  </div>
</template>
