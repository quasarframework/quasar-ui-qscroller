import { defineLegacyComponent } from "../utils/vue-compat";

type RenderData = {
  class?: Record<string, boolean>;
  style?: Record<string, string>;
  [key: string]: unknown;
};

const BRAND_COLORS = new Set([
  "primary",
  "secondary",
  "accent",
  "dark",
  "dark-page",
  "positive",
  "negative",
  "info",
  "warning",
]);

const CSS_COLOR_VALUE_RE =
  /^(#|currentcolor$|transparent$|inherit$|initial$|revert$|unset$|(rgb|hsl|hwb|lab|lch|oklab|oklch|color|color-mix)\()/i;
const SIMPLE_CSS_COLOR_NAME_RE = /^[a-z]+$/i;

function normalizeColor(color: string | undefined): string | undefined {
  if (color === void 0) return void 0;

  const normalized = color.toString().trim();
  return normalized.length > 0 ? normalized : void 0;
}

function isCssVariable(color: string): boolean {
  return color.startsWith("--") || color.startsWith("var(");
}

function toCssVariable(color: string, fallback: string): string {
  return color.startsWith("var(") ? color : `var(${color}, ${fallback})`;
}

function isCssColorValue(color: string): boolean {
  return CSS_COLOR_VALUE_RE.test(color) || SIMPLE_CSS_COLOR_NAME_RE.test(color);
}

function toCssColor(color: string | undefined, fallback: string): string {
  const normalized = normalizeColor(color);

  if (normalized === void 0) {
    return fallback;
  }

  if (BRAND_COLORS.has(normalized)) {
    return `var(--q-${normalized}, ${fallback})`;
  }

  if (isCssVariable(normalized)) {
    return toCssVariable(normalized, fallback);
  }

  return isCssColorValue(normalized) === true ? normalized : fallback;
}

function shouldUseColorClass(color: string | undefined): boolean {
  const normalized = normalizeColor(color);

  return (
    normalized !== void 0 &&
    BRAND_COLORS.has(normalized) !== true &&
    isCssVariable(normalized) !== true &&
    isCssColorValue(normalized) !== true
  );
}

function addClass(data: RenderData, className: string): RenderData {
  data.class = {
    ...data.class,
    [className]: true,
  };

  return data;
}

function addStyle(data: RenderData, style: Record<string, string>): RenderData {
  data.style = {
    ...data.style,
    ...style,
  };

  return data;
}

export const ScrollerColorMixin = defineLegacyComponent({
  name: "ScrollerColorMixin",

  methods: {
    calculateColor(color: string | undefined, defaultColor = "black") {
      return toCssColor(color, defaultColor);
    },

    setCssColorVar(
      style: Record<string, unknown>,
      name: string,
      color: string | undefined,
      fallback: string,
    ) {
      style[name] = toCssColor(color, fallback);
      return style;
    },

    setBothColors(color: string | undefined, bgColor: string | undefined, data: RenderData = {}) {
      return this.setTextColor(color, this.setBackgroundColor(bgColor, data));
    },

    setBackgroundColor(color: string | undefined, data: RenderData = {}) {
      const normalized = normalizeColor(color);

      if (normalized === void 0) {
        return data;
      }

      if (shouldUseColorClass(normalized) === true) {
        return addClass(data, `bg-${normalized}`);
      }

      return addStyle(data, {
        "background-color": toCssColor(normalized, "transparent"),
      });
    },

    setTextColor(color: string | undefined, data: RenderData = {}) {
      const normalized = normalizeColor(color);

      if (normalized === void 0) {
        return data;
      }

      if (shouldUseColorClass(normalized) === true) {
        return addClass(data, `text-${normalized}`);
      }

      const cssColor = toCssColor(normalized, "currentColor");

      return addStyle(data, {
        color: cssColor,
        "caret-color": cssColor,
      });
    },

    setBorderColor(color: string | undefined, data: RenderData = {}) {
      const normalized = normalizeColor(color);

      if (normalized === void 0) {
        return data;
      }

      return addStyle(data, {
        "border-color": toCssColor(normalized, "currentColor"),
      });
    },
  },
});
