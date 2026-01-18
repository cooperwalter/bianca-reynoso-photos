<script setup lang="ts">
const props = withDefaults(defineProps<{
    bgClass?: string;
    gradClass?: string;
    roundnessClass?: string;
    contentClass?: string;
    as?: string;
}>(),{
    bgClass: "bg-white dark:bg-zinc-900",
    gradClass: "bg-gradient-to-r from-yellow-400 to-pink-400 opacity-30",
    roundnessClass: "rounded-2xl",
    contentClass: "",
    as: "div"
})
</script>

<template>
    <component :is="props.as" :class="$cls('group relative p-8', props.roundnessClass)" v-bind="$attrs">
        <div :class="$cls('absolute -inset-px', props.gradClass, props.roundnessClass)" aria-hidden="true"/>
        <div :class="$cls('absolute inset-0', props.bgClass, props.roundnessClass)" aria-hidden="true"/>
        <div class="relative z-10" :class="props.contentClass">
            <slot />
        </div>
    </component>
</template>
