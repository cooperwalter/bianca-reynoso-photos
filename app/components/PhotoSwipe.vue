<script setup lang="ts">
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

interface Props {
  images?: Array<{ src: string; width?: number; height?: number }>;
  imageSelector?: string;
}

const props = withDefaults(defineProps<Props>(), {
  images: undefined,
  imageSelector: "a",
});

const gallery = ref(null);
const slots = useSlots();
const children = slots.default() ? slots.default()[0].children : false;
const childrenType = children ? children[0].type : false;

let lightbox;

onMounted(() => {
  if (!lightbox && childrenType) {
    const config = {
      gallery: gallery.value,
      pswpModule: () => import("photoswipe"),
    };

    // If images prop is provided, use dataSource API
    if (props.images) {
      config.dataSource = props.images.map((img) => ({
        src: img.src,
        width: img.width || 1600,
        height: img.height || 1200,
      }));

      lightbox = new PhotoSwipeLightbox(config);
      lightbox.init();

      // Add click event listeners for manual index handling
      const anchors = gallery.value.querySelectorAll(`[data-pswp-index]`);
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const index = parseInt(anchor.dataset.pswpIndex, 10);
          lightbox.loadAndOpen(index);
        });
      });
    } else {
      // Backward compatibility - use children selector
      config.children = props.imageSelector;
      lightbox = new PhotoSwipeLightbox(config);
      lightbox.init();
    }
  }
});

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});
</script>

<template>
  <div ref="gallery">
    <slot />
  </div>
</template>
