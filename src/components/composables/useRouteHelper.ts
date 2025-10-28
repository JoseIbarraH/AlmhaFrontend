// src/composables/useRouteHelper.ts
import { useRoute } from "vue-router";

export function useRouteHelper() {
  const route = useRoute();

  function current(options: { name?: string; path?: string }): boolean {
    if (options.name) {
      return route.name === options.name;
    }
    if (options.path) {
      return route.path === options.path;
    }
    return false;
  }

  return { current };
}
