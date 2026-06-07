/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

import { defineIndexScript } from "@quasar/app-vite";

export default defineIndexScript((api) => {
  api.compatibleWith("quasar", "^2.0.0");
  api.compatibleWith("@quasar/app-vite", ">=3.0.0-beta.40");

  api.registerDescribeApi("QScroller", "~@quasar/quasar-ui-qscroller/dist/api/QScroller.json");

  api.extendQuasarConf(() => ({
    boot: ["~@quasar/quasar-app-extension-qscroller/dist/boot/vite-register.js"],
    css: ["~@quasar/quasar-ui-qscroller/src/index.scss"],
  }));
});
