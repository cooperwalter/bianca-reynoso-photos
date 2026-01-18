/**
 * A custom Nuxt plugin to merge all arguments into a single classname string.
 */
export default defineNuxtPlugin(() => {
    return {
      provide: {
        /**
         * Merge all arguments into a single classname string.
         */
        cls: (...args: unknown[]) => {
            return args.filter((x) => x).join(' ')
        }
      }
    }
  })