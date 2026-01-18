<script setup lang="ts">
import type { Image } from "~/types/image";

type Props = {
  images: Image[];
};

defineProps<Props>();

const img = useImage();
</script>

<template>
  <div class="not-prose">
    <PhotoSwipe>
      <div>
        <MasonryWall :items="images" :ssr-columns="1" :column-width="300" :gap="32" class="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <template #default="{ item }">
            <a class="photoswipe-item rounded-xl overflow-hidden block dark:bg-zinc-800 bg-zinc-200" :href="img((item as Image).src, { width: 1600 })" data-cropped="true" :data-pswp-width="(item as Image).width" :data-pswp-height="(item as Image).height">
              <NuxtImg :src="(item as Image).src" alt="Some image" sizes="sm:90vw md:50vw lg:30vw" class="w-full h-full object-cover object-center" :width="(item as Image).width" :height="(item as Image).height" loading="lazy" />
            </a>
          </template>
        </MasonryWall>
      </div>
    </PhotoSwipe>
  </div>
</template>
