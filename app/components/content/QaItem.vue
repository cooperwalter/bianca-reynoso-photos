<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
</script>

<template>
  <Disclosure v-slot="{ open }" as="div" class="pt-6">
    <dt>
      <DisclosureButton class="flex w-full items-start justify-between text-left text-zinc-900 dark:text-zinc-200">
        <span class="text-base font-semibold leading-7">
            <slot name="question" />
        </span>
        <span class="ml-6 flex h-7 items-center">
          <Icon v-if="!open" name="heroicons:plus-small" class="h-6 w-6" />
          <Icon v-else name="heroicons:minus-small" class="h-6 w-6" />
        </span>
      </DisclosureButton>
    </dt>
    <DisclosurePanel as="dd" class="mt-2 pr-12">
      <p class="text-base leading-7 text-zinc-600 dark:text-zinc-500">
        <slot name="answer" />
      </p>
    </DisclosurePanel>
  </Disclosure>
</template>
