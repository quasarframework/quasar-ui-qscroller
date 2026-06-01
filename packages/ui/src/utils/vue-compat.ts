import { defineComponent, h } from "vue";
import type { VNodeChild } from "vue";

export interface LegacyRenderData {
  attrs?: Record<string, unknown>;
  class?: unknown;
  key?: unknown;
  on?: Record<string, (...args: unknown[]) => unknown>;
  props?: Record<string, unknown>;
  ref?: string;
  scopedSlots?: Record<string, (...args: unknown[]) => VNodeChild>;
  staticClass?: string;
  style?: unknown;
}

function toHandlerName(name: string): string {
  if (/^on[A-Z]/.test(name)) {
    return name;
  }

  const eventName = name.replace(/(^|-)(\w)/g, (_match, _dash, char: string) => char.toUpperCase());
  return `on${eventName}`;
}

export function defineLegacyComponent<T extends Record<string, unknown>>(
  component: T & ThisType<any>,
): T {
  return defineComponent(component as any) as unknown as T;
}

export function legacyH(
  type: unknown,
  data?: LegacyRenderData | null,
  children?: VNodeChild,
): VNodeChild {
  if (data == null) {
    return h(type as any, null, children as any);
  }

  const { attrs, class: dynamicClass, on, props, scopedSlots, staticClass, ...rest } = data;
  const normalized: Record<string, unknown> = {
    ...attrs,
    ...rest,
    ...props,
  };

  if (staticClass !== void 0 || dynamicClass !== void 0) {
    normalized.class = staticClass !== void 0 ? [staticClass, dynamicClass] : dynamicClass;
  }

  if (on !== void 0) {
    for (const [name, handler] of Object.entries(on)) {
      normalized[toHandlerName(name)] = handler;
    }
  }

  return h(type as any, normalized, (children ?? scopedSlots) as any);
}

export function callLegacyMethod<T = unknown>(
  vm: Record<string, any>,
  name: string,
  ...args: unknown[]
): T {
  const direct = vm?.[name];
  if (typeof direct === "function") {
    return direct.apply(vm, args);
  }

  const fallback = vm?.$options?.methods?.[name];
  if (typeof fallback === "function") {
    return fallback.apply(vm, args);
  }

  throw new TypeError(`${name} is not a function`);
}
